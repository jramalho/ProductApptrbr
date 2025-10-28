import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFromCache,
  setToCache,
  clearCache,
  clearAllCache,
} from '../src/utils/cache';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  getAllKeys: jest.fn(),
  multiRemove: jest.fn(),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Cache Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getFromCache', () => {
    it('should return cached data when valid cache exists', async () => {
      const testData = { id: 1, name: 'Test Product' };
      const cacheEntry = {
        data: testData,
        timestamp: Date.now(),
      };

      mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify(cacheEntry));

      const result = await getFromCache('test-key');

      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(
        '@ProductApp:cache:test-key'
      );
      expect(result).toEqual(testData);
    });

    it('should return null when no cache exists', async () => {
      mockedAsyncStorage.getItem.mockResolvedValue(null);

      const result = await getFromCache('non-existent-key');

      expect(result).toBeNull();
    });

    it('should return null and remove cache when cache is expired', async () => {
      const testData = { id: 1, name: 'Test Product' };
      const expiredTime = Date.now() - 6 * 60 * 1000; // 6 minutes ago
      const cacheEntry = {
        data: testData,
        timestamp: expiredTime,
      };

      mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify(cacheEntry));
      mockedAsyncStorage.removeItem.mockResolvedValue();

      const result = await getFromCache('expired-key');

      expect(mockedAsyncStorage.removeItem).toHaveBeenCalledWith(
        '@ProductApp:cache:expired-key'
      );
      expect(result).toBeNull();
    });

    it('should handle JSON parse errors gracefully', async () => {
      mockedAsyncStorage.getItem.mockResolvedValue('invalid-json');

      const result = await getFromCache('invalid-key');

      expect(result).toBeNull();
    });

    it('should handle AsyncStorage errors gracefully', async () => {
      mockedAsyncStorage.getItem.mockRejectedValue(
        new Error('Storage error')
      );

      const result = await getFromCache('error-key');

      expect(result).toBeNull();
    });
  });

  describe('setToCache', () => {
    it('should store data in cache with timestamp', async () => {
      const testData = { id: 1, name: 'Test Product' };
      const mockNow = Date.now();
      jest.spyOn(Date, 'now').mockReturnValue(mockNow);

      mockedAsyncStorage.setItem.mockResolvedValue();

      await setToCache('test-key', testData);

      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        '@ProductApp:cache:test-key',
        JSON.stringify({
          data: testData,
          timestamp: mockNow,
        })
      );
    });

    it('should handle AsyncStorage set errors gracefully', async () => {
      const testData = { id: 1, name: 'Test Product' };
      mockedAsyncStorage.setItem.mockRejectedValue(
        new Error('Storage error')
      );

      // Should not throw
      await expect(setToCache('error-key', testData)).resolves.toBeUndefined();
    });

    it('should work with different data types', async () => {
      mockedAsyncStorage.setItem.mockResolvedValue();

      // Test with array
      await setToCache('array-key', [1, 2, 3]);
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        '@ProductApp:cache:array-key',
        expect.any(String)
      );

      // Test with string
      await setToCache('string-key', 'test string');
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        '@ProductApp:cache:string-key',
        expect.any(String)
      );

      // Test with number
      await setToCache('number-key', 42);
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        '@ProductApp:cache:number-key',
        expect.any(String)
      );
    });
  });

  describe('clearCache', () => {
    it('should remove specific cache entry', async () => {
      mockedAsyncStorage.removeItem.mockResolvedValue();

      await clearCache('test-key');

      expect(mockedAsyncStorage.removeItem).toHaveBeenCalledWith(
        '@ProductApp:cache:test-key'
      );
    });

    it('should handle removal errors gracefully', async () => {
      mockedAsyncStorage.removeItem.mockRejectedValue(
        new Error('Storage error')
      );

      // Should not throw
      await expect(clearCache('error-key')).resolves.toBeUndefined();
    });
  });

  describe('clearAllCache', () => {
    it('should remove all cache entries with correct prefix', async () => {
      const allKeys = [
        '@ProductApp:cache:key1',
        '@ProductApp:cache:key2',
        '@ProductApp:other:key3',
        '@ProductApp:cache:key4',
      ];

      mockedAsyncStorage.getAllKeys.mockResolvedValue(allKeys);
      mockedAsyncStorage.multiRemove.mockResolvedValue();

      await clearAllCache();

      expect(mockedAsyncStorage.multiRemove).toHaveBeenCalledWith([
        '@ProductApp:cache:key1',
        '@ProductApp:cache:key2',
        '@ProductApp:cache:key4',
      ]);
    });

    it('should handle empty keys array', async () => {
      mockedAsyncStorage.getAllKeys.mockResolvedValue([]);
      mockedAsyncStorage.multiRemove.mockResolvedValue();

      await clearAllCache();

      expect(mockedAsyncStorage.multiRemove).toHaveBeenCalledWith([]);
    });

    it('should handle errors gracefully', async () => {
      mockedAsyncStorage.getAllKeys.mockRejectedValue(
        new Error('Storage error')
      );

      // Should not throw
      await expect(clearAllCache()).resolves.toBeUndefined();
    });
  });

  describe('Cache expiry', () => {
    it('should validate cache within 5 minute window', async () => {
      const testData = { id: 1, name: 'Test Product' };
      
      // Cache created 4 minutes ago (should be valid)
      const recentTime = Date.now() - 4 * 60 * 1000;
      const cacheEntry = {
        data: testData,
        timestamp: recentTime,
      };

      mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify(cacheEntry));

      const result = await getFromCache('recent-key');

      expect(result).toEqual(testData);
      expect(mockedAsyncStorage.removeItem).not.toHaveBeenCalled();
    });

    it('should invalidate cache after 5 minute window', async () => {
      const testData = { id: 1, name: 'Test Product' };
      
      // Cache created 6 minutes ago (should be invalid)
      const oldTime = Date.now() - 6 * 60 * 1000;
      const cacheEntry = {
        data: testData,
        timestamp: oldTime,
      };

      mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify(cacheEntry));
      mockedAsyncStorage.removeItem.mockResolvedValue();

      const result = await getFromCache('old-key');

      expect(result).toBeNull();
      expect(mockedAsyncStorage.removeItem).toHaveBeenCalledWith(
        '@ProductApp:cache:old-key'
      );
    });
  });
});
