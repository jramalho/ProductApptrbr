import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../src/components/SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <SearchBar value="" onChangeText={() => {}} />
    );
    expect(getByTestId('search-input')).toBeTruthy();
  });

  it('displays the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar 
        value="" 
        onChangeText={() => {}} 
        placeholder="Custom placeholder"
      />
    );
    expect(getByPlaceholderText('Custom placeholder')).toBeTruthy();
  });

  it('displays the default placeholder when none provided', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={() => {}} />
    );
    expect(getByPlaceholderText('Search products...')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );
    
    const input = getByTestId('search-input');
    fireEvent.changeText(input, 'test search');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('test search');
  });

  it('displays the current value', () => {
    const { getByDisplayValue } = render(
      <SearchBar value="current search" onChangeText={() => {}} />
    );
    expect(getByDisplayValue('current search')).toBeTruthy();
  });

  it('uses custom testID when provided', () => {
    const { getByTestId } = render(
      <SearchBar 
        value="" 
        onChangeText={() => {}} 
        testID="custom-search-input"
      />
    );
    expect(getByTestId('custom-search-input')).toBeTruthy();
  });
});
