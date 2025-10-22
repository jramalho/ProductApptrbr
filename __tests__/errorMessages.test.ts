import { getErrorDetails, getErrorMessage } from '../src/utils/errorMessages';
import { AxiosError } from 'axios';

describe('errorMessages utility', () => {
  describe('getErrorDetails', () => {
    it('should return correct details for "No internet connection" error', () => {
      const error = new Error('No internet connection');
      const details = getErrorDetails(error);

      expect(details.title).toBe('No Internet Connection');
      expect(details.message).toBe('Please check your network connection and try again.');
      expect(details.actionText).toBe('Retry');
      expect(details.isRetryable).toBe(true);
    });

    it('should return correct details for network timeout error', () => {
      const error = new Error('Network timeout occurred');
      const details = getErrorDetails(error);

      expect(details.title).toBe('Connection Problem');
      expect(details.isRetryable).toBe(true);
    });

    it('should return correct details for 404 error', () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 404,
        },
      } as AxiosError;

      const details = getErrorDetails(error);

      expect(details.title).toBe('Not Found');
      expect(details.isRetryable).toBe(false);
      expect(details.actionText).toBe('Go Back');
    });

    it('should return correct details for 500 error', () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 500,
        },
      } as AxiosError;

      const details = getErrorDetails(error);

      expect(details.title).toBe('Server Error');
      expect(details.isRetryable).toBe(true);
      expect(details.actionText).toBe('Retry');
    });

    it('should return correct details for 429 error', () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 429,
        },
      } as AxiosError;

      const details = getErrorDetails(error);

      expect(details.title).toBe('Too Many Requests');
      expect(details.isRetryable).toBe(true);
    });

    it('should return correct details for connection failed', () => {
      const error = {
        isAxiosError: true,
        response: undefined,
      } as AxiosError;

      const details = getErrorDetails(error);

      expect(details.title).toBe('Connection Failed');
      expect(details.isRetryable).toBe(true);
    });

    it('should return correct details for 401/403 errors', () => {
      const error401 = {
        isAxiosError: true,
        response: {
          status: 401,
        },
      } as AxiosError;

      const details = getErrorDetails(error401);

      expect(details.title).toBe('Access Denied');
      expect(details.isRetryable).toBe(false);
    });

    it('should return default error for unknown error types', () => {
      const error = new Error('Unknown error');
      const details = getErrorDetails(error);

      expect(details.title).toBe('Unexpected Error');
      expect(details.isRetryable).toBe(true);
    });

    it('should return default error for non-Error objects', () => {
      const error = 'string error';
      const details = getErrorDetails(error);

      expect(details.title).toBe('Unexpected Error');
      expect(details.message).toBe('Something went wrong. Please try again.');
    });
  });

  describe('getErrorMessage', () => {
    it('should return formatted error message string', () => {
      const error = new Error('No internet connection');
      const message = getErrorMessage(error);

      expect(message).toBe('No Internet Connection: Please check your network connection and try again.');
    });

    it('should return formatted error message for axios error', () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 404,
        },
      } as AxiosError;

      const message = getErrorMessage(error);

      expect(message).toContain('Not Found');
    });
  });
});
