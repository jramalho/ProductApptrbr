# Error Handling & Recovery

## Overview

This document describes the comprehensive error handling and recovery system implemented in the ProductApptrbr application. The system provides robust error detection, user-friendly error messages, automatic retry mechanisms, and graceful error recovery.

## Key Components

### 1. Error Boundary Component

**Location**: `src/components/ErrorBoundary/index.tsx`

The ErrorBoundary component catches JavaScript errors anywhere in the component tree and displays a fallback UI instead of crashing the entire application.

**Features**:
- Catches all component-level errors
- Displays user-friendly error messages
- Provides "Try Again" functionality to reset the error state
- Supports custom fallback UI
- Logs errors for debugging

**Usage**:
```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={(error, reset) => <CustomErrorView error={error} onReset={reset} />}>
  <YourComponent />
</ErrorBoundary>
```

### 2. ErrorMessage Component

**Location**: `src/components/ErrorMessage/index.tsx`

A reusable component for displaying consistent error messages throughout the application.

**Features**:
- Configurable title, message, and icon
- Optional action button with callback
- Consistent styling across the app
- Accessible with proper testIDs

**Props**:
```typescript
interface ErrorMessageProps {
  title: string;           // Error title (e.g., "Connection Failed")
  message: string;         // Detailed error message
  actionText?: string;     // Text for action button (e.g., "Retry")
  onAction?: () => void;   // Callback when action button is pressed
  icon?: string;          // Custom emoji/icon (default: ⚠️)
  testID?: string;        // Test identifier (default: 'error-message')
}
```

**Usage**:
```typescript
<ErrorMessage
  title="Connection Failed"
  message="Unable to connect to the server. Please try again."
  actionText="Retry"
  onAction={handleRetry}
  icon="⚠️"
/>
```

### 3. Error Utilities

**Location**: `src/utils/errorMessages.ts`

Utility functions for generating user-friendly error messages based on error types.

**Functions**:

#### `getErrorDetails(error: unknown): ErrorDetails`

Analyzes an error and returns detailed information including:
- User-friendly title
- Descriptive message
- Appropriate action text
- Whether the error is retryable

**Error Types Handled**:
- **Network Errors**: No internet connection, timeouts
- **HTTP Status Codes**:
  - 400: Invalid Request
  - 401/403: Access Denied
  - 404: Not Found
  - 429: Too Many Requests
  - 500-504: Server Errors
- **Default**: Unexpected errors

**Example**:
```typescript
try {
  await fetchData();
} catch (error) {
  const errorDetails = getErrorDetails(error);
  // errorDetails = {
  //   title: "Connection Failed",
  //   message: "Unable to connect to the server...",
  //   actionText: "Retry",
  //   isRetryable: true
  // }
}
```

#### `getErrorMessage(error: unknown): string`

Returns a simple formatted error message string (for backward compatibility).

### 4. Network Status Detection

**Location**: `src/hooks/useNetworkStatus.ts`, `src/components/NetworkStatusIndicator/index.tsx`

**Features**:
- Real-time network connectivity monitoring
- Visual indicator when offline
- Animated banner with smooth transitions
- Automatic detection of connection changes

**Hook Usage**:
```typescript
const { isConnected, isInternetReachable, type } = useNetworkStatus();
```

### 5. API Service Retry Logic

**Location**: `src/services/index.ts`

**Features**:
- Automatic retry for transient failures
- Configurable retry attempts (default: 2)
- Exponential backoff with delays
- Network check before requests
- Intelligent retry decision based on error type

**Retry Conditions**:
- Network timeouts (408)
- Too many requests (429)
- Server errors (500-599)
- No response from server

**Configuration**:
```typescript
const MAX_RETRIES = 2;      // Number of retry attempts
const RETRY_DELAY = 1000;   // Delay between retries (ms)
```

## Error Handling in Pages

### Home Page

**Error Handling**:
- Catches product fetch failures
- Displays ErrorMessage component with appropriate details
- Provides retry functionality
- Silently handles category fetch failures (uses default)

**Implementation**:
```typescript
try {
  const products = await service.getProducts(url, queryString);
  setProductsList(products);
} catch (err) {
  setError(err);
}

// Render
{error && productsList.length === 0 ? (
  <ErrorMessage
    {...getErrorDetails(error)}
    onAction={handleRetry}
  />
) : (
  <ProductList />
)}
```

### Product Detail Page

**Error Handling**:
- Catches product item fetch failures
- Displays ErrorMessage with appropriate action (Retry or Go Back)
- Differentiates between retryable and non-retryable errors

**Implementation**:
```typescript
const errorDetails = getErrorDetails(error);
<ErrorMessage
  {...errorDetails}
  onAction={errorDetails.isRetryable ? handleRetry : handleGoBack}
  icon={errorDetails.isRetryable ? '⚠️' : '❌'}
/>
```

## User Experience Benefits

1. **Clear Communication**: Users always know what went wrong and why
2. **Actionable Feedback**: Users know what they can do to resolve the issue
3. **Automatic Recovery**: Network issues are automatically retried
4. **Graceful Degradation**: App continues functioning even with partial failures
5. **Consistent Experience**: All errors follow the same patterns and styling

## Testing

### Unit Tests

**ErrorMessage Component** (`__tests__/ErrorMessage.test.tsx`):
- Rendering with different props
- Action button functionality
- Custom icons and testIDs
- Conditional rendering

**Error Utilities** (`__tests__/errorMessages.test.ts`):
- Network error handling
- HTTP status code mapping
- Default error fallbacks
- Error message formatting

### Testing Guidelines

1. **Simulate Network Failures**: Test app behavior with airplane mode
2. **Test Error States**: Navigate to non-existent products (404)
3. **Test Retry Logic**: Verify retry happens automatically
4. **Test Error Boundaries**: Trigger component errors to test boundaries
5. **Test User Actions**: Verify retry and go-back actions work correctly

## Implementation Checklist

✅ Error Boundary component for component-level errors  
✅ Retry logic for API requests with exponential backoff  
✅ Network status detection and visual indicator  
✅ User-friendly error messages with recovery actions  
✅ Consistent ErrorMessage component  
✅ Error utilities for message generation  
✅ Enhanced error handling in Home page  
✅ Enhanced error handling in Product page  
✅ Comprehensive test coverage  
✅ Documentation

## Roadmap Completion

This implementation completes **Phase 1, Item 2: Error Handling & Recovery** from the roadmap:
- ✅ Implement error boundaries for component-level error catching
- ✅ Add retry logic for failed API requests
- ✅ Add user-friendly error messages with recovery actions
- ✅ Add network status detection

## Future Enhancements

Potential improvements for future iterations:

1. **Error Logging Service**: Integration with services like Sentry or Crashlytics
2. **Offline Mode**: Cache data for offline usage
3. **Optimistic Updates**: Show UI updates before API confirmation
4. **Error Analytics**: Track error frequency and patterns
5. **Custom Error Recovery**: Specific recovery strategies per error type
6. **Toast Notifications**: Non-blocking error notifications for minor issues
7. **Error Reports**: Allow users to report persistent errors

## Technical Details

### Dependencies

No new dependencies were added. The implementation uses:
- React Native core components
- `@react-native-community/netinfo` (existing)
- `axios` (existing)
- `styled-components` (existing)

### File Structure

```
src/
├── components/
│   ├── ErrorBoundary/
│   │   └── index.tsx               # Error boundary component
│   ├── ErrorMessage/
│   │   ├── index.tsx               # Error message component
│   │   └── styles.ts               # Styled components
│   └── NetworkStatusIndicator/
│       └── index.tsx               # Network status banner
├── hooks/
│   └── useNetworkStatus.ts         # Network monitoring hook
├── utils/
│   └── errorMessages.ts            # Error message utilities
├── services/
│   └── index.ts                    # API service with retry logic
└── pages/
    ├── Home/
    │   └── index.tsx               # Enhanced error handling
    └── Product/
        └── index.tsx               # Enhanced error handling

__tests__/
├── ErrorMessage.test.tsx           # ErrorMessage tests
├── errorMessages.test.ts           # Utility tests
├── ErrorBoundary.test.tsx          # ErrorBoundary tests (existing)
└── NetworkStatusIndicator.test.tsx # Network indicator tests (existing)
```

## Best Practices

1. **Always catch and handle errors** - Never let errors crash the app
2. **Provide actionable feedback** - Tell users what they can do
3. **Use appropriate error types** - Differentiate between recoverable and non-recoverable errors
4. **Test error scenarios** - Include error cases in your tests
5. **Log errors appropriately** - Use console.error for debugging
6. **Keep error messages user-friendly** - Avoid technical jargon
7. **Implement retry logic** - For transient failures
8. **Show network status** - Keep users informed about connectivity

## Support

For questions or issues related to error handling, please refer to:
- This documentation
- Component source code and inline comments
- Test files for usage examples
- Roadmap discussion for context and decisions
