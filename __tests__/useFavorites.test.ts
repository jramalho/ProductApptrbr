import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavorites, FavoriteProduct } from '../src/hooks/useFavorites';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useFavorites Hook', () => {
  const mockProduct: FavoriteProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    rating: 4.5,
    thumbnail: 'https://example.com/image.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty favorites', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoriteProducts).toEqual([]);
  });

  it('should load favorites from AsyncStorage', async () => {
    const storedData = {
      ids: [1],
      products: [mockProduct],
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedData));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual([1]);
    expect(result.current.favoriteProducts).toEqual([mockProduct]);
  });

  it('should add a product to favorites', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      const isFavorite = result.current.toggleFavorite(mockProduct);
      expect(isFavorite).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.favorites).toContain(1);
      expect(result.current.favoriteProducts).toContainEqual(mockProduct);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('should remove a product from favorites', async () => {
    const storedData = {
      ids: [1],
      products: [mockProduct],
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedData));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      const isFavorite = result.current.toggleFavorite(mockProduct);
      expect(isFavorite).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.favorites).not.toContain(1);
      expect(result.current.favoriteProducts).not.toContainEqual(mockProduct);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('should check if a product is favorite', async () => {
    const storedData = {
      ids: [1],
      products: [mockProduct],
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedData));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(false);
  });

  it('should clear all favorites', async () => {
    const storedData = {
      ids: [1],
      products: [mockProduct],
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedData));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.clearFavorites();
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
      expect(result.current.favoriteProducts).toEqual([]);
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@ProductApp:favorites');
  });

  it('should handle errors when loading favorites', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual([]);
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('should handle errors when saving favorites', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.toggleFavorite(mockProduct);
    });

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    consoleError.mockRestore();
  });
});
