import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatusIndicator from './components/NetworkStatusIndicator';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['productapp://'],
  config: {
    screens: {
      HomePage: '',
      ProductPage: 'product/:itemId',
    },
  },
};

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
          <Stack.Screen
            options={{ title: 'Product', headerBackTitle: 'back' }}
            name="ProductPage"
            component={ProductPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <NetworkStatusIndicator />
    </ErrorBoundary>
  );
}

export default App;
