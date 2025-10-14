import { renderHook, waitFor } from '@testing-library/react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNetworkStatus } from '../src/hooks/useNetworkStatus';

jest.mock('@react-native-community/netinfo');

const mockedNetInfo = NetInfo as jest.Mocked<typeof NetInfo>;

describe('useNetworkStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial network status', async () => {
    const mockState = {
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    };

    mockedNetInfo.fetch.mockResolvedValue(mockState as any);
    mockedNetInfo.addEventListener.mockReturnValue(() => {});

    const { result } = renderHook(() => useNetworkStatus());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
      expect(result.current.isInternetReachable).toBe(true);
      expect(result.current.type).toBe('wifi');
    });
  });

  it('should return offline status when not connected', async () => {
    const mockState = {
      isConnected: false,
      isInternetReachable: false,
      type: 'none',
    };

    mockedNetInfo.fetch.mockResolvedValue(mockState as any);
    mockedNetInfo.addEventListener.mockReturnValue(() => {});

    const { result } = renderHook(() => useNetworkStatus());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(false);
      expect(result.current.isInternetReachable).toBe(false);
      expect(result.current.type).toBe('none');
    });
  });

  it('should update status when network changes', async () => {
    const initialState = {
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    };

    const updatedState = {
      isConnected: false,
      isInternetReachable: false,
      type: 'none',
    };

    let eventListener: (state: any) => void = () => {};

    mockedNetInfo.fetch.mockResolvedValue(initialState as any);
    mockedNetInfo.addEventListener.mockImplementation((listener) => {
      eventListener = listener;
      return () => {};
    });

    const { result } = renderHook(() => useNetworkStatus());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });

    // Simulate network change
    eventListener(updatedState);

    await waitFor(() => {
      expect(result.current.isConnected).toBe(false);
      expect(result.current.isInternetReachable).toBe(false);
      expect(result.current.type).toBe('none');
    });
  });

  it('should handle cellular connection', async () => {
    const mockState = {
      isConnected: true,
      isInternetReachable: true,
      type: 'cellular',
    };

    mockedNetInfo.fetch.mockResolvedValue(mockState as any);
    mockedNetInfo.addEventListener.mockReturnValue(() => {});

    const { result } = renderHook(() => useNetworkStatus());

    await waitFor(() => {
      expect(result.current.type).toBe('cellular');
      expect(result.current.isConnected).toBe(true);
    });
  });

  it('should handle null internet reachability', async () => {
    const mockState = {
      isConnected: true,
      isInternetReachable: null,
      type: 'wifi',
    };

    mockedNetInfo.fetch.mockResolvedValue(mockState as any);
    mockedNetInfo.addEventListener.mockReturnValue(() => {});

    const { result } = renderHook(() => useNetworkStatus());

    await waitFor(() => {
      expect(result.current.isInternetReachable).toBeNull();
    });
  });

  it('should unsubscribe on unmount', async () => {
    const unsubscribeMock = jest.fn();
    mockedNetInfo.fetch.mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    } as any);
    mockedNetInfo.addEventListener.mockReturnValue(unsubscribeMock);

    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
