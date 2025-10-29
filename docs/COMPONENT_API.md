# Component API Documentation

This document provides detailed API documentation for all reusable components in ProductApptrbr.

## Table of Contents

- [ErrorBoundary](#errorboundary)
- [NetworkStatusIndicator](#networkstatusindicator)
- [ProductItem](#productitem)
- [SortButton](#sortbutton)

---

## ErrorBoundary

A React error boundary component that catches JavaScript errors anywhere in the child component tree and displays a fallback UI.

### Location
`src/components/ErrorBoundary/index.tsx`

### Props

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | The child components to wrap with error boundary |

### State

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

### Usage

```typescript
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### Features

- Catches errors during rendering, in lifecycle methods, and in constructors
- Displays user-friendly error message
- Provides "Try Again" button to reset error state
- Logs errors to console for debugging

### Error Handling

When an error is caught:
1. `hasError` state is set to `true`
2. Error information is stored in state
3. Fallback UI is rendered
4. Error is logged to console

### Methods

#### `static getDerivedStateFromError(error: Error)`
Updates state when an error is caught.

#### `componentDidCatch(error: Error, errorInfo: React.ErrorInfo)`
Logs error information for debugging.

#### `handleResetError()`
Resets the error state and attempts to re-render children.

### Example Error UI

```
⚠️ Oops! Something went wrong

An unexpected error occurred. Please try again.

[Try Again]
```

---

## NetworkStatusIndicator

A banner component that displays the current network connection status.

### Location
`src/components/NetworkStatusIndicator/index.tsx`

### Props

```typescript
interface NetworkStatusIndicatorProps {
  // No props - uses useNetworkStatus hook internally
}
```

### Dependencies

- `useNetworkStatus` hook from `src/hooks/useNetworkStatus.ts`
- `@react-native-community/netinfo`

### Usage

```typescript
import NetworkStatusIndicator from './components/NetworkStatusIndicator';

function App() {
  return (
    <View>
      <NetworkStatusIndicator />
      <YourContent />
    </View>
  );
}
```

### Behavior

- Automatically monitors network connection state
- Shows banner when offline
- Hides when online
- Uses `useNetworkStatus` custom hook

### Visual States

#### Online
No indicator visible (hidden)

#### Offline
```
🚫 No Internet Connection
You're offline. Some features may not be available.
```

### Styling

- **Background**: `#FFC107` (amber/warning color)
- **Text Color**: `#000000` (black)
- **Padding**: 12px
- **Alignment**: Center
- **Position**: Top of screen (absolute positioning)

### Network Status Hook

The component uses `useNetworkStatus()` hook which returns:

```typescript
interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
}
```

---

## ProductItem

A list item component that displays product information in a card format.

### Location
`src/components/ProductItem/index.tsx`

### Props

```typescript
interface ProductItemProps {
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  action: () => void;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Product name/title |
| `price` | `number` | Yes | Product price (USD) |
| `rating` | `number` | Yes | Product rating (0-5) |
| `thumbnail` | `string` | Yes | Product image URL |
| `action` | `() => void` | Yes | Callback function when item is pressed |

### Usage

```typescript
import ProductItem from './components/ProductItem';

<ProductItem
  title="iPhone 14 Pro"
  price={999.99}
  rating={4.8}
  thumbnail="https://example.com/iphone.jpg"
  action={() => console.log('Product clicked')}
/>
```

### Layout Structure

```
┌────────────────────────────┐
│  ┌──────┐  iPhone 14 Pro   │
│  │Image │  $999.99          │
│  │ 80px │  ⭐ Rating: 4.8   │
│  └──────┘                   │
└────────────────────────────┘
```

### Styling

**Container**
- Flex direction: Row
- Padding: 10px
- Border: 1px solid #CCCCCC
- Border radius: 8px
- Margin bottom: 8px
- Background: White

**Image**
- Width: 80px
- Height: 80px
- Border radius: 8px
- Resize mode: Cover

**Text**
- Title: 16px, bold, black
- Price: 14px, green (#4CAF50)
- Rating: 12px, gray

### TestID

`product-item-{testId}` (if testId prop is provided)

---

## SortButton

A button component for sorting products by a specific criterion.

### Location
`src/components/SortButton/index.tsx`

### Props

```typescript
interface SortButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Button label text |
| `active` | `boolean` | Yes | Whether this sort option is currently active |
| `onPress` | `() => void` | Yes | Callback function when button is pressed |

### Usage

```typescript
import SortButton from './components/SortButton';

<SortButton
  label="Sort by Price"
  active={sortBy === 'price'}
  onPress={() => handleSort('price')}
/>
```

### Visual States

#### Inactive
```
┌─────────────────┐
│ Sort by Price   │
└─────────────────┘
```
- Background: `#EEEEEE`
- Text color: `#333333`

#### Active
```
┌─────────────────┐
│ Sort by Price   │ ✓
└─────────────────┘
```
- Background: `#2196F3` (blue)
- Text color: `#FFFFFF`
- Shows checkmark indicator

### Styling

**Button**
- Padding: 10px 16px
- Border radius: 20px
- Margin: 4px
- Min width: 120px

**Text**
- Font size: 14px
- Font weight: Active → Bold, Inactive → Normal
- Alignment: Center

### Accessibility

- `accessibilityRole`: "button"
- `accessibilityState`: `{ selected: active }`
- `accessibilityLabel`: `"${label}, ${active ? 'selected' : 'not selected'}"`

---

## Custom Hooks

### useNetworkStatus

A custom hook that monitors network connectivity status.

#### Location
`src/hooks/useNetworkStatus.ts`

#### Returns

```typescript
interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `isConnected` | `boolean` | Whether device is connected to a network |
| `isInternetReachable` | `boolean` | Whether internet is accessible |

#### Usage

```typescript
import useNetworkStatus from './hooks/useNetworkStatus';

function MyComponent() {
  const { isConnected, isInternetReachable } = useNetworkStatus();
  
  if (!isConnected) {
    return <Text>No connection</Text>;
  }
  
  if (!isInternetReachable) {
    return <Text>Connection exists but no internet</Text>;
  }
  
  return <Content />;
}
```

#### Features

- Automatic connection monitoring
- Real-time updates
- Network type detection
- Internet reachability check

#### Dependencies

- `@react-native-community/netinfo`

---

## Styled Components

All components use `styled-components/native` for styling. Styles are defined in separate `styles.ts` files colocated with components.

### Example Structure

```typescript
// Component: src/components/Button/index.tsx
import * as S from './styles';

const Button: React.FC<ButtonProps> = ({ label, onPress }) => (
  <S.Container onPress={onPress}>
    <S.Label>{label}</S.Label>
  </S.Container>
);

// Styles: src/components/Button/styles.ts
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 12px 24px;
  background-color: #2196f3;
  border-radius: 8px;
`;

export const Label = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
```

---

## Type Definitions

### IProductItem

```typescript
interface IProductItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  brand?: string;
  description?: string;
  stock?: string;
}
```

### ISelectInput

```typescript
interface ISelectInput {
  label: string;
  value: string;
}
```

---

## Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Reusability**: Design components to be reusable across the app
4. **Styling**: Use styled-components for all styling
5. **Testing**: Write tests for all components

### Performance

1. **Memoization**: Use `React.memo()` for expensive components
2. **Callbacks**: Use `useCallback` for event handlers passed as props
3. **List Rendering**: Use `FlashList` instead of `FlatList` for better performance
4. **Image Optimization**: Specify image dimensions to prevent layout shifts

### Accessibility

1. **Labels**: Provide meaningful `accessibilityLabel` for all interactive elements
2. **Roles**: Use appropriate `accessibilityRole` (button, link, image, etc.)
3. **Hints**: Add `accessibilityHint` for complex interactions
4. **States**: Use `accessibilityState` to communicate current state

---

## Additional Resources

- [React Native Component API](https://reactnative.dev/docs/components-and-apis)
- [Styled Components Documentation](https://styled-components.com/docs/basics)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
