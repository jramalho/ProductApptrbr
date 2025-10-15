import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoriteButton from '../src/components/FavoriteButton';

describe('FavoriteButton Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when not favorite', () => {
    const { getByTestId } = render(
      <FavoriteButton isFavorite={false} onPress={mockOnPress} testID="favorite-btn" />
    );

    const button = getByTestId('favorite-btn');
    expect(button).toBeTruthy();
  });

  it('should render correctly when favorite', () => {
    const { getByTestId } = render(
      <FavoriteButton isFavorite={true} onPress={mockOnPress} testID="favorite-btn" />
    );

    const button = getByTestId('favorite-btn');
    expect(button).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByTestId } = render(
      <FavoriteButton isFavorite={false} onPress={mockOnPress} testID="favorite-btn" />
    );

    const button = getByTestId('favorite-btn');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should accept custom size prop', () => {
    const { getByTestId } = render(
      <FavoriteButton
        isFavorite={false}
        onPress={mockOnPress}
        testID="favorite-btn"
        size={32}
      />
    );

    const button = getByTestId('favorite-btn');
    expect(button).toBeTruthy();
  });

  it('should accept custom color prop', () => {
    const { getByTestId } = render(
      <FavoriteButton
        isFavorite={false}
        onPress={mockOnPress}
        testID="favorite-btn"
        color="#ff0000"
      />
    );

    const button = getByTestId('favorite-btn');
    expect(button).toBeTruthy();
  });
});
