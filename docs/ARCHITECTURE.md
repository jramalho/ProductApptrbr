# Architecture Documentation

This document describes the architectural decisions, patterns, and principles used in ProductApptrbr.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Design Patterns](#design-patterns)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Navigation](#navigation)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)

---

## Architecture Overview

ProductApptrbr follows a **component-based architecture** with clear separation of concerns, leveraging React Native's paradigms and best practices.

### Architectural Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers
2. **Component Composition**: Building complex UIs from simple, reusable components
3. **Unidirectional Data Flow**: Props down, events up pattern
4. **Type Safety**: Full TypeScript coverage for reliability
5. **Modularity**: Loose coupling, high cohesion
6. **Testability**: Components designed to be easily testable

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│          Presentation Layer             │
│  (Components, Screens, Navigation)      │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│         Business Logic Layer            │
│     (Hooks, Context, Utilities)         │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│           Data Layer                    │
│   (API Services, Local Storage)         │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│         External Services               │
│   (DummyJSON API, Native Modules)       │
└─────────────────────────────────────────┘
```

---

## Design Patterns

### 1. Container/Presentational Pattern

**Pages** (Home, Product) act as container components that:
- Manage state and business logic
- Fetch data from services
- Pass data down to presentational components

**Components** (ProductItem, SortButton) are presentational:
- Receive data via props
- Focus on rendering UI
- Emit events via callbacks

```typescript
// Container (Page)
const Home: React.FC = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <ProductList
      products={products}
      onProductPress={handleProductPress}
    />
  );
};

// Presentational Component
const ProductList: React.FC<Props> = ({ products, onProductPress }) => (
  <FlashList
    data={products}
    renderItem={({ item }) => (
      <ProductItem {...item} onPress={() => onProductPress(item.id)} />
    )}
  />
);
```

### 2. Custom Hooks Pattern

Encapsulate reusable stateful logic in custom hooks:

```typescript
// useNetworkStatus.ts
export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    
    return unsubscribe;
  }, []);
  
  return { isConnected };
}
```

### 3. Service Layer Pattern

Centralized API communication in service modules:

```typescript
// services/index.ts
export async function getProducts(url: string, query: string) {
  try {
    const response = await axios.get(`${url}?${query}`);
    return response.data.products || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}
```

### 4. Error Boundary Pattern

Catch and handle component errors gracefully:

```typescript
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.handleReset} />;
    }
    
    return this.props.children;
  }
}
```

---

## Project Structure

```
ProductApptrbr/
├── src/
│   ├── App.tsx                 # Root component, navigation setup
│   │
│   ├── components/             # Reusable UI components
│   │   ├── ErrorBoundary/
│   │   ├── NetworkStatusIndicator/
│   │   ├── ProductItem/
│   │   └── SortButton/
│   │
│   ├── pages/                  # Screen components (containers)
│   │   ├── Home/
│   │   │   ├── index.tsx       # Home screen logic
│   │   │   └── styles.ts       # Home screen styles
│   │   └── Product/
│   │       ├── index.tsx       # Product detail logic
│   │       └── styles.ts       # Product detail styles
│   │
│   ├── services/               # API and external services
│   │   └── index.ts            # API functions
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useNetworkStatus.ts
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── constants/              # App-wide constants
│   │   └── index.ts
│   │
│   └── utils/                  # Utility functions
│
├── android/                    # Android native code
├── ios/                        # iOS native code
├── __tests__/                  # Test files
└── __mocks__/                  # Mock files
```

### Directory Responsibilities

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `components/` | Reusable UI components | ProductItem, SortButton |
| `pages/` | Full screen components | Home, Product |
| `services/` | API and data fetching | getProducts, getCategories |
| `hooks/` | Custom React hooks | useNetworkStatus |
| `types/` | TypeScript definitions | IProductItem, ISelectInput |
| `constants/` | App constants | BASE_URL, LIMIT |
| `utils/` | Helper functions | formatPrice, debounce |

---

## Data Flow

### Typical Data Flow Pattern

```
User Interaction
      ↓
Event Handler (in Page/Container)
      ↓
Service Layer (API call)
      ↓
State Update (useState/setState)
      ↓
Re-render Components
      ↓
Updated UI
```

### Example: Loading Products

```typescript
// 1. User pulls to refresh
const handleRefresh = () => {
  // 2. Call service layer
  fetchProducts();
};

// 3. Service makes API call
const fetchProducts = async () => {
  setLoading(true);
  const products = await service.getProducts(url, query);
  
  // 4. Update state
  setProducts(products);
  setLoading(false);
};

// 5. Component re-renders with new data
<FlashList
  data={products}
  renderItem={renderProduct}
  refreshing={loading}
  onRefresh={handleRefresh}
/>
```

---

## State Management

ProductApptrbr uses **local component state** with React hooks for state management.

### State Management Strategy

| State Type | Solution | Example |
|------------|----------|---------|
| **Component State** | `useState` | Loading states, form inputs |
| **Side Effects** | `useEffect` | Data fetching, subscriptions |
| **Derived State** | Computed values | Filtered lists, calculations |
| **Global State** | Context API (if needed) | Theme, authentication |

### Why Local State?

1. **Simplicity**: No additional libraries needed
2. **Performance**: Only relevant components re-render
3. **Colocation**: State lives close to where it's used
4. **Sufficient**: App complexity doesn't require Redux/MobX

### Example State Management

```typescript
const Home: React.FC = () => {
  // Component state
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Derived state
  const hasProducts = products.length > 0;
  
  // Side effects
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (/* JSX */);
};
```

---

## Navigation

Navigation is handled by **React Navigation 6.x**.

### Navigation Structure

```
Stack Navigator (Root)
├── HomePage (Home)
└── ProductPage (Product Detail)
```

### Navigation Configuration

```typescript
// App.tsx
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={Home} />
        <Stack.Screen name="ProductPage" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Deep Linking Configuration

```typescript
const linking = {
  prefixes: ['productapp://'],
  config: {
    screens: {
      ProductPage: 'product/:itemId',
    },
  },
};
```

### Navigation Best Practices

1. **Type Safety**: Define navigation param types
2. **Deep Links**: Support deep linking for all screens
3. **Persistence**: Consider state persistence for better UX
4. **Guards**: Implement navigation guards if authentication is added

---

## API Integration

### Service Layer Architecture

```
┌──────────────────────────────────────┐
│         Component Layer              │
│  (calls service functions)           │
└─────────────┬────────────────────────┘
              │
┌─────────────▼────────────────────────┐
│        Service Layer                 │
│  (API abstraction, error handling)   │
└─────────────┬────────────────────────┘
              │
┌─────────────▼────────────────────────┐
│         HTTP Client (Axios)          │
└─────────────┬────────────────────────┘
              │
┌─────────────▼────────────────────────┐
│       External API (DummyJSON)       │
└──────────────────────────────────────┘
```

### Service Design Principles

1. **Abstraction**: Components don't know about API details
2. **Error Handling**: Services handle errors, return safe defaults
3. **Type Safety**: Strong typing for requests and responses
4. **Consistency**: Uniform error handling across services

### Example Service Function

```typescript
export async function getProducts(
  url: string,
  queryString: string
): Promise<IProductItem[]> {
  try {
    const response = await axios.get(`${url}?${queryString}`);
    
    if (!response.data || !response.data.products) {
      return [];
    }
    
    return response.data.products;
  } catch (error) {
    console.error('getProducts error:', error);
    
    // Return safe default instead of throwing
    return [];
  }
}
```

---

## Error Handling

### Error Handling Strategy

ProductApptrbr implements multi-level error handling:

#### 1. Component Level
```typescript
try {
  const products = await service.getProducts(url, query);
  setProducts(products);
} catch (error) {
  setError('Failed to load products');
}
```

#### 2. Service Level
```typescript
export async function getProducts(url: string, query: string) {
  try {
    const response = await axios.get(`${url}?${query}`);
    return response.data.products || [];
  } catch (error) {
    console.error('API error:', error);
    return []; // Safe default
  }
}
```

#### 3. Error Boundary Level
```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Error Handling Hierarchy

```
┌─────────────────────────────────────┐
│       Error Boundary                │
│   (Catches unhandled errors)        │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│     Component Error Handling        │
│   (Try-catch, error state)          │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│     Service Error Handling          │
│   (Safe defaults, logging)          │
└─────────────────────────────────────┘
```

---

## Performance Optimization

### Optimization Strategies

#### 1. List Rendering
- Use `@shopify/flash-list` instead of `FlatList`
- Implement `keyExtractor` properly
- Use `getItemType` for heterogeneous lists

```typescript
<FlashList
  data={products}
  renderItem={renderProduct}
  keyExtractor={(item) => item.id.toString()}
  estimatedItemSize={100}
/>
```

#### 2. Image Optimization
- Specify image dimensions
- Use appropriate resize modes
- Consider image caching library

```typescript
<Image
  source={{ uri: thumbnail }}
  style={{ width: 80, height: 80 }}
  resizeMode="cover"
/>
```

#### 3. Component Memoization
- Use `React.memo` for expensive components
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations

```typescript
const ProductItem = React.memo<ProductItemProps>(({ title, price, onPress }) => {
  return (/* JSX */);
});

const handlePress = useCallback(() => {
  navigation.navigate('ProductPage', { itemId });
}, [itemId, navigation]);
```

#### 4. Lazy Loading
- Implement infinite scroll for lists
- Load data on demand
- Paginate API requests

---

## Security Considerations

### Current Security Measures

1. **Type Safety**: TypeScript prevents runtime type errors
2. **Input Validation**: Validate all user inputs
3. **Error Messages**: Don't expose sensitive information
4. **HTTPS**: Use secure connections for API calls
5. **Deep Link Validation**: Validate deep link parameters

### Security Best Practices

1. **No Sensitive Data in Code**: Use environment variables
2. **API Keys**: Store securely, never commit
3. **User Input**: Sanitize and validate
4. **Error Handling**: Don't leak stack traces to users
5. **Dependencies**: Keep dependencies updated

---

## Testing Strategy

### Test Pyramid

```
        ┌─────────┐
        │   E2E   │  ← Few comprehensive tests
        ├─────────┤
        │Integration│ ← More integration tests
        ├─────────┤
        │   Unit  │  ← Many unit tests
        └─────────┘
```

### Testing Approach

1. **Unit Tests**: Components, hooks, utilities
2. **Integration Tests**: Navigation flows, API integration
3. **Snapshot Tests**: UI consistency
4. **Manual Testing**: Platform-specific features

---

## Future Considerations

### Potential Improvements

1. **State Management**: Consider Redux/MobX for complex state
2. **Code Splitting**: Lazy load heavy screens
3. **Offline Support**: Implement data caching
4. **Analytics**: Add user behavior tracking
5. **Error Monitoring**: Integrate Sentry or similar
6. **Performance Monitoring**: Track app performance metrics

### Scalability

As the app grows:
- Consider feature-based folder structure
- Implement shared component library
- Add state management solution
- Enhance error tracking
- Implement CI/CD pipeline

---

## References

- [React Native Architecture](https://reactnative.dev/docs/intro-react-native-components)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Patterns](https://reactpatterns.com/)
