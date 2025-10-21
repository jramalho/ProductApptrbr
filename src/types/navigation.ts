import { NavigatorScreenParams } from '@react-navigation/native';

// Define parameter types for each screen
export type RootStackParamList = {
  HomePage: undefined;
  ProductPage: {
    itemId: number;
  };
};

// Helper types for navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
