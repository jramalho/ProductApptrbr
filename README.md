# Product List App

This is a React Native application that allows users to view and interact with a
list of products.
The app utilizes the DummyJSON API to fetch product data and includes features
such as filtering, sorting and viewing detailed product information.
Additionally, the app supports local push notifications triggered by the app itself.

This project uses **React Native** along with libraries such as
**React Navigation**, **FlashList**, **Styled Components**
**Axios**, and **Notifee**
to handle notifications.

## Features

- **Product List:** The main page displays a list of products.
- **Filter by Category:** Users can filter products by different categories.
- **Sort by Price or Ratings:** Products can be sorted by price or user ratings.
- **Product Details:** By clicking on a product, users are redirected to a new
  screen that contains more detailed information about the product.
- **Push Notifications:** The app includes a local push notification feature,
  triggered by the app itself.
- **Deep Link:** The app includes a deep link integration that opens the app to
  a specific product by the product id.
- **Native Module:** The app includes a native module that allow the user to
  create a one hour event on the user app calendar.

## Requirements

To run this project locally, you'll need to have the following tools installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

## Setup

1. Clone the repository to your local machine.
   
   ```bash
   git clone https://github.com/Thierry-Santos/ProductApp.git
   cd ProductApp
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. For iOS:
   - Navigate to the `/ios` directory:
   
     ```bash
     cd ios
     ```
   - Install CocoaPods dependencies:
   
     ```bash
     pod install
     ```
   - After that, return to the root project directory and run the app:

     ```bash
     cd ..
     npx react-native run-ios
     ```

4. For Android:

   Ensure you have an Android emulator running or a device connected, and then use the following command:

   ```bash
   npx react-native run-android
   ```

## Deep Link

For testing Deep link on android/ios run this commands:

1. IOS

```bash
npx uri-scheme open "productapp://product/1" --ios
```

2. ANDROID

```bash
npx uri-scheme open "productapp://product/1" --android
```

## Code Quality

This project uses automated code quality tools to maintain consistent code style and catch errors early:

- **Husky**: Git hooks for automated checks
- **lint-staged**: Runs linters on staged files only
- **ESLint**: JavaScript/TypeScript code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

### Available Scripts

```bash
# Lint code
yarn lint
yarn lint:fix

# Format code
yarn format
yarn format:check

# Type check
yarn type-check

# Run tests
yarn test
```

### Git Hooks

- **Pre-commit**: Automatically lints and formats staged files
- **Commit-msg**: Validates commit message format (Conventional Commits)

For more details, see [CODE_QUALITY.md](CODE_QUALITY.md).

## License

This project is licensed under the terms of the **GNU General Public License v3.0**.
See the [LICENSE](LICENSE) file for details.
