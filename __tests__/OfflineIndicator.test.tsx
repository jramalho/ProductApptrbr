import React from 'react';
import { render } from '@testing-library/react-native';
import OfflineIndicator from '../src/components/OfflineIndicator';

describe('OfflineIndicator', () => {
  it('should not render when isOffline is false', () => {
    const { queryByTestId } = render(<OfflineIndicator isOffline={false} />);
    
    expect(queryByTestId('offline-indicator')).toBeNull();
  });

  it('should render when isOffline is true', () => {
    const { getByTestId } = render(<OfflineIndicator isOffline={true} />);
    
    expect(getByTestId('offline-indicator')).toBeTruthy();
  });

  it('should display correct message when offline', () => {
    const { getByText } = render(<OfflineIndicator isOffline={true} />);
    
    expect(getByText("Showing cached data - You're offline")).toBeTruthy();
  });

  it('should display icon when offline', () => {
    const { getByText } = render(<OfflineIndicator isOffline={true} />);
    
    expect(getByText('📶')).toBeTruthy();
  });
});
