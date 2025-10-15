import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import FavoritesPage from './pages/Favorites';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatusIndicator from './components/NetworkStatusIndicator';
import { FavoritesProvider } from './contexts/FavoritesContext';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['productapp://'],
  config: {
    screens: {
      HomePage: '',
      ProductPage: 'product/:itemId',
      FavoritesPage: 'favorites',
    },
  },
};

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
            <Stack.Screen
              options={{ title: 'Product', headerBackTitle: 'back' }}
              name="ProductPage"
              component={ProductPage}
            />
            <Stack.Screen
              options={{ title: 'Favorites', headerBackTitle: 'back' }}
              name="FavoritesPage"
              component={FavoritesPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <NetworkStatusIndicator />
      </FavoritesProvider>
    </ErrorBoundary>
  );
}

export default App;
