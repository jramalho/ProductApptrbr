import { AxiosError } from 'axios';

export interface ErrorDetails {
  title: string;
  message: string;
  actionText: string;
  isRetryable: boolean;
}

/**
 * Get user-friendly error message based on error type
 */
export const getErrorDetails = (error: unknown): ErrorDetails => {
  // Network/connection errors
  if (error instanceof Error) {
    if (error.message === 'No internet connection') {
      return {
        title: 'No Internet Connection',
        message: 'Please check your network connection and try again.',
        actionText: 'Retry',
        isRetryable: true,
      };
    }

    if (error.message.includes('Network Error') || error.message.includes('timeout')) {
      return {
        title: 'Connection Problem',
        message: 'We couldn\'t reach the server. Please check your connection and try again.',
        actionText: 'Retry',
        isRetryable: true,
      };
    }
  }

  // Axios errors
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    if (!axiosError.response) {
      return {
        title: 'Connection Failed',
        message: 'Unable to connect to the server. Please try again.',
        actionText: 'Retry',
        isRetryable: true,
      };
    }

    switch (status) {
      case 400:
        return {
          title: 'Invalid Request',
          message: 'There was a problem with your request. Please try again.',
          actionText: 'Go Back',
          isRetryable: false,
        };
      case 401:
      case 403:
        return {
          title: 'Access Denied',
          message: 'You don\'t have permission to access this content.',
          actionText: 'Go Back',
          isRetryable: false,
        };
      case 404:
        return {
          title: 'Not Found',
          message: 'The content you\'re looking for doesn\'t exist or has been removed.',
          actionText: 'Go Back',
          isRetryable: false,
        };
      case 429:
        return {
          title: 'Too Many Requests',
          message: 'You\'ve made too many requests. Please wait a moment and try again.',
          actionText: 'Retry',
          isRetryable: true,
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          title: 'Server Error',
          message: 'Our servers are experiencing issues. Please try again in a few moments.',
          actionText: 'Retry',
          isRetryable: true,
        };
      default:
        return {
          title: 'Something Went Wrong',
          message: 'An unexpected error occurred. Please try again.',
          actionText: 'Retry',
          isRetryable: true,
        };
    }
  }

  // Default error
  return {
    title: 'Unexpected Error',
    message: 'Something went wrong. Please try again.',
    actionText: 'Retry',
    isRetryable: true,
  };
};

/**
 * Get a simple error message string (for backward compatibility)
 */
export const getErrorMessage = (error: unknown): string => {
  const details = getErrorDetails(error);
  return `${details.title}: ${details.message}`;
};
