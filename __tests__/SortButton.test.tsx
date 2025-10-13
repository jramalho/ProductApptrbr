import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SortButton from '../src/components/SortButton';

describe('SortButton Component', () => {
  const defaultProps = {
    name: 'Sort by Price',
    icon: 'arrow-up',
    active: false,
    action: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    const {getByText} = render(<SortButton {...defaultProps} />);

    expect(getByText('Sort by Price')).toBeTruthy();
  });

  it('calls action callback when pressed', () => {
    const mockAction = jest.fn();
    const {getByText} = render(
      <SortButton {...defaultProps} action={mockAction} />,
    );

    const button = getByText('Sort by Price').parent;
    fireEvent.press(button!);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('renders with active state', () => {
    const {getByTestId} = render(
      <SortButton {...defaultProps} active={true} testID="sort-button" />,
    );

    const button = getByTestId('sort-button');
    expect(button.props.active).toBe(true);
  });

  it('renders with inactive state', () => {
    const {getByTestId} = render(
      <SortButton {...defaultProps} active={false} testID="sort-button" />,
    );

    const button = getByTestId('sort-button');
    expect(button.props.active).toBe(false);
  });

  it('renders with custom testID', () => {
    const {getByTestId} = render(
      <SortButton {...defaultProps} testID="custom-sort-button" />,
    );

    expect(getByTestId('custom-sort-button')).toBeTruthy();
  });

  it('displays different button names correctly', () => {
    const {getByText, rerender} = render(
      <SortButton {...defaultProps} name="Price: Low to High" />,
    );

    expect(getByText('Price: Low to High')).toBeTruthy();

    rerender(<SortButton {...defaultProps} name="Rating: High to Low" />);

    expect(getByText('Rating: High to Low')).toBeTruthy();
  });

  it('handles multiple rapid presses', () => {
    const mockAction = jest.fn();
    const {getByText} = render(
      <SortButton {...defaultProps} action={mockAction} />,
    );

    const button = getByText('Sort by Price').parent;

    fireEvent.press(button!);
    fireEvent.press(button!);
    fireEvent.press(button!);

    expect(mockAction).toHaveBeenCalledTimes(3);
  });

  it('renders with different icon names', () => {
    const {rerender, getByText} = render(
      <SortButton {...defaultProps} icon="arrow-up" />,
    );

    expect(getByText('Sort by Price')).toBeTruthy();

    rerender(<SortButton {...defaultProps} icon="arrow-down" />);

    expect(getByText('Sort by Price')).toBeTruthy();
  });

  it('toggles between active and inactive states', () => {
    const {getByTestId, rerender} = render(
      <SortButton {...defaultProps} active={false} testID="toggle-button" />,
    );

    let button = getByTestId('toggle-button');
    expect(button.props.active).toBe(false);

    rerender(
      <SortButton {...defaultProps} active={true} testID="toggle-button" />,
    );

    button = getByTestId('toggle-button');
    expect(button.props.active).toBe(true);
  });
});
