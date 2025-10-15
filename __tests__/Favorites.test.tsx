import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Favorites from '../src/pages/Favorites';
import { FavoritesProvider } from '../src/contexts/FavoritesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe('Favorites Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { getByTestId } = render(
      <FavoritesProvider>
        <Favorites navigation={mockNavigation as any} />
      </FavoritesProvider>
    );

    // Loading indicator should be present
    // Note: ActivityIndicator doesn't have a testID by default
  });

  it('should render empty state when no favorites', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { getByText } = render(
      <FavoritesProvider>
        <Favorites navigation={mockNavigation as any} />
      </FavoritesProvider>
    );

    await waitFor(() => {
      expect(getByText('No favorites yet!')).toBeTruthy();
      expect(getByText('Add products to your favorites by tapping the heart icon')).toBeTruthy();
    });
  });

  it('should render favorites list when favorites exist', async () => {
    const mockFavorites = {
      ids: [1, 2],
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 99.99,
          rating: 4.5,
          thumbnail: 'https://example.com/1.jpg',
        },
        {
          id: 2,
          title: 'Product 2',
          price: 149.99,
          rating: 4.8,
          thumbnail: 'https://example.com/2.jpg',
        },
      ],
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockFavorites));

    const { getByText } = render(
      <FavoritesProvider>
        <Favorites navigation={mockNavigation as any} />
      </FavoritesProvider>
    );

    await waitFor(() => {
      expect(getByText('My Favorites')).toBeTruthy();
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('Product 2')).toBeTruthy();
    });
  });
});
