import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import NetworkStatusIndicator from '../src/components/NetworkStatusIndicator';
import { useNetworkStatus } from '../src/hooks/useNetworkStatus';

jest.mock('../src/hooks/useNetworkStatus');
const mockedUseNetworkStatus = useNetworkStatus as jest.MockedFunction<typeof useNetworkStatus>;

describe('NetworkStatusIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    mockedUseNetworkStatus.mockReturnValue({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    });

    const { getByTestId } = render(<NetworkStatusIndicator />);
    expect(getByTestId('network-status-indicator')).toBeTruthy();
  });

  it('should show offline message when not connected', async () => {
    mockedUseNetworkStatus.mockReturnValue({
      isConnected: false,
      isInternetReachable: false,
      type: 'none',
    });

    const { getByText } = render(<NetworkStatusIndicator />);

    await waitFor(() => {
      expect(getByText('No Internet Connection')).toBeTruthy();
      expect(getByText('Please check your connection and try again')).toBeTruthy();
    });
  });

  it('should show offline message when internet is not reachable', async () => {
    mockedUseNetworkStatus.mockReturnValue({
      isConnected: true,
      isInternetReachable: false,
      type: 'wifi',
    });

    const { getByText } = render(<NetworkStatusIndicator />);

    await waitFor(() => {
      expect(getByText('No Internet Connection')).toBeTruthy();
    });
  });

  it('should handle network status changes', async () => {
    const { rerender, getByText, queryByText } = render(<NetworkStatusIndicator />);

    // Start online
    mockedUseNetworkStatus.mockReturnValue({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    });

    rerender(<NetworkStatusIndicator />);

    // Go offline
    mockedUseNetworkStatus.mockReturnValue({
      isConnected: false,
      isInternetReachable: false,
      type: 'none',
    });

    rerender(<NetworkStatusIndicator />);

    await waitFor(() => {
      expect(getByText('No Internet Connection')).toBeTruthy();
    });
  });

  it('should handle null connection state', () => {
    mockedUseNetworkStatus.mockReturnValue({
      isConnected: null,
      isInternetReachable: null,
      type: null,
    });

    const { getByTestId } = render(<NetworkStatusIndicator />);
    expect(getByTestId('network-status-indicator')).toBeTruthy();
  });
});
