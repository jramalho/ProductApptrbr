import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {Alert, NativeModules} from 'react-native';
import Product from '../src/pages/Product';
import * as service from '../src/services';

jest.mock('../src/services');

const mockRoute = {
  params: {
    itemId: 1,
  },
} as any;

const mockProductItem = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  rating: 4.5,
  thumbnail: 'https://example.com/image.jpg',
  brand: 'Test Brand',
  description: 'Test description of the product',
  stock: '50',
};

describe('Product Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Alert.alert = jest.fn();
  });

  it('renders loading state initially', () => {
    const getProductsItem = service.getProductsItem as jest.Mock;
    getProductsItem.mockImplementation(() => new Promise(() => {})); // Never resolves

    const {getByTestId} = render(<Product route={mockRoute} />);

    // Should show loading indicator
    expect(() => getByTestId('create-reminder-button')).toThrow();
  });

  it('fetches and displays product information', async () => {
    const getProductsItem = service.getProductsItem as jest.Mock;
    getProductsItem.mockResolvedValue(mockProductItem);

    const {getByText} = render(<Product route={mockRoute} />);

    await waitFor(() => {
      expect(getProductsItem).toHaveBeenCalledWith(1, expect.any(String));
      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('$ 99.99')).toBeTruthy();
      expect(getByText(/Rating: 4.5/)).toBeTruthy();
      expect(getByText(/Test Brand/)).toBeTruthy();
      expect(getByText(/Test description of the product/)).toBeTruthy();
      expect(getByText(/50/)).toBeTruthy();
    });
  });

  it('calls CalendarModule when create reminder button is pressed', async () => {
    const getProductsItem = service.getProductsItem as jest.Mock;
    getProductsItem.mockResolvedValue(mockProductItem);

    const mockAddEvent = jest.fn((title, description, successCallback) => {
      successCallback('Event added successfully');
    });

    NativeModules.CalendarModule = {
      addEvent: mockAddEvent,
    };

    const {getByTestId} = render(<Product route={mockRoute} />);

    await waitFor(() => {
      expect(getByTestId('create-reminder-button')).toBeTruthy();
    });

    const reminderButton = getByTestId('create-reminder-button');
    fireEvent.press(reminderButton);

    expect(mockAddEvent).toHaveBeenCalledWith(
      'Important Reminder',
      'You still have a product to buy today!',
      expect.any(Function),
      expect.any(Function),
    );

    expect(Alert.alert).toHaveBeenCalledWith(
      'Success',
      'Event added successfully',
    );
  });

  it('handles CalendarModule error correctly', async () => {
    const getProductsItem = service.getProductsItem as jest.Mock;
    getProductsItem.mockResolvedValue(mockProductItem);

    const mockAddEvent = jest.fn(
      (title, description, successCallback, errorCallback) => {
        errorCallback('Failed to add event');
      },
    );

    NativeModules.CalendarModule = {
      addEvent: mockAddEvent,
    };

    const {getByTestId} = render(<Product route={mockRoute} />);

    await waitFor(() => {
      expect(getByTestId('create-reminder-button')).toBeTruthy();
    });

    const reminderButton = getByTestId('create-reminder-button');
    fireEvent.press(reminderButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to add event');
  });

  it('handles null product data gracefully', async () => {
    const getProductsItem = service.getProductsItem as jest.Mock;
    getProductsItem.mockResolvedValue(null);

    const {queryByTestId} = render(<Product route={mockRoute} />);

    await waitFor(() => {
      expect(getProductsItem).toHaveBeenCalled();
    });

    // Should show loading state when product is null
    expect(queryByTestId('create-reminder-button')).toBeNull();
  });

  it('refetches product when itemId changes', async () => {
    const getProductsItem = service.getProductsItem as jest.Mock;
    getProductsItem.mockResolvedValue(mockProductItem);

    const {rerender} = render(<Product route={mockRoute} />);

    await waitFor(() => {
      expect(getProductsItem).toHaveBeenCalledWith(1, expect.any(String));
    });

    const newRoute = {
      params: {
        itemId: 2,
      },
    } as any;

    rerender(<Product route={newRoute} />);

    await waitFor(() => {
      expect(getProductsItem).toHaveBeenCalledWith(2, expect.any(String));
      expect(getProductsItem).toHaveBeenCalledTimes(2);
    });
  });
});
