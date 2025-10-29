# ProductApptrbr

[![React Native](https://img.shields.io/badge/React%20Native-0.78.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](LICENSE)

A modern, feature-rich React Native application for browsing and managing product catalogs. Built with TypeScript and following best practices, this app demonstrates advanced React Native concepts including custom native modules, deep linking, push notifications, and offline support.

## 📱 Overview

ProductApptrbr is a production-ready mobile application that provides a seamless shopping experience using the DummyJSON API. The app showcases best practices in React Native development, including proper error handling, network status monitoring, accessibility features, and comprehensive testing.

## ✨ Key Features

### Core Functionality
- **📦 Product Catalog**: Browse through an extensive product list with infinite scroll
- **🔍 Advanced Filtering**: Filter products by category with instant updates
- **⚡ Smart Sorting**: Sort products by price or rating in ascending/descending order
- **📄 Detailed Views**: Rich product detail pages with images, descriptions, and stock information
- **💾 Offline Support**: View previously loaded products even without internet connection

### User Experience
- **🌐 Network Monitoring**: Real-time network status indicator with automatic reconnection
- **⚠️ Error Handling**: Comprehensive error messages with recovery actions
- **♿ Accessibility**: Full screen reader support (TalkBack/VoiceOver) with WCAG 2.1 Level AA compliance
- **🎨 Skeleton Screens**: Smooth loading states with animated placeholders
- **📱 Responsive Design**: Optimized layouts for various screen sizes

### Advanced Features
- **🔔 Push Notifications**: Local notifications powered by Notifee
- **🔗 Deep Linking**: Navigate directly to products via custom URL scheme (`productapp://product/{id}`)
- **📅 Calendar Integration**: Custom native module for creating calendar reminders
- **🔄 Pull-to-Refresh**: Easy content updates with intuitive gesture
- **⚙️ Type Safety**: Full TypeScript coverage for enhanced developer experience

## 🏗️ Architecture

### Technology Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React Native 0.78.1 |
| **Language** | TypeScript 5.x |
| **Navigation** | React Navigation 6.x |
| **State Management** | React Hooks (useState, useEffect, useContext) |
| **UI Components** | Styled Components |
| **List Rendering** | @shopify/flash-list (optimized) |
| **Network** | Axios |
| **Notifications** | Notifee |
| **Testing** | Jest, React Native Testing Library |
| **Code Quality** | ESLint, Prettier |

### Project Structure

```
ProductApptrbr/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ErrorBoundary/  # Error boundary wrapper
│   │   ├── NetworkStatusIndicator/  # Network status banner
│   │   ├── ProductItem/    # Product list item component
│   │   └── SortButton/     # Sorting button component
│   ├── constants/          # App constants and configuration
│   ├── hooks/              # Custom React hooks
│   │   └── useNetworkStatus.ts  # Network monitoring hook
│   ├── pages/              # Screen components
│   │   ├── Home/           # Product list screen
│   │   └── Product/        # Product detail screen
│   ├── services/           # API service layer
│   │   └── index.ts        # API functions (getProducts, getCategories, etc.)
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Root component with navigation setup
├── android/                # Android native code
│   └── app/src/main/java/  # Native modules (CalendarModule)
├── ios/                    # iOS native code
│   └── ProductApptrbr/     # Native modules (CalendarModule)
├── __tests__/              # Test files
└── __mocks__/              # Mock files for testing
```

### Design Patterns

- **Component-Based Architecture**: Modular, reusable components
- **Custom Hooks**: Encapsulated logic (e.g., `useNetworkStatus`)
- **Error Boundaries**: Graceful error handling at component level
- **Service Layer**: Centralized API communication
- **Type Safety**: Full TypeScript coverage for reliability

## 📋 Requirements

### Development Environment

- **Node.js**: 18.x or higher
- **Yarn**: 1.22.x or higher
- **React Native CLI**: Latest version
- **Watchman**: (recommended for macOS)

### Platform-Specific Requirements

#### iOS Development
- **macOS**: Required for iOS development
- **Xcode**: 14.0 or higher
- **CocoaPods**: 1.11.x or higher
- **iOS Simulator** or physical device running iOS 13.0+

#### Android Development
- **Android Studio**: Latest stable version
- **Android SDK**: API Level 21 (Android 5.0) or higher
- **Java Development Kit (JDK)**: 17 or higher
- **Android Emulator** or physical device running Android 5.0+



## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jramalho/ProductApptrbr.git
cd ProductApptrbr
```

### 2. Install Dependencies

```bash
# Install JavaScript dependencies
yarn install

# For iOS only - install CocoaPods dependencies
cd ios && pod install && cd ..
```

### 3. Running the App

#### iOS

```bash
# Start Metro bundler (in one terminal)
yarn start

# Run on iOS simulator (in another terminal)
yarn ios

# Or run on specific iOS simulator
yarn ios --simulator="iPhone 15 Pro"

# Run on physical iOS device
yarn ios --device
```

#### Android

```bash
# Start Metro bundler (in one terminal)
yarn start

# Run on Android emulator or device (in another terminal)
yarn android

# Run on specific Android device
adb devices  # List connected devices
yarn android --deviceId=<device-id>
```

### 4. Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage

# Run specific test file
yarn test <filename>
```

### 5. Linting and Formatting

```bash
# Check code style
yarn lint

# Auto-fix linting issues
yarn lint --fix

# Format code with Prettier (automatically on save if configured)
```



## 🔗 Deep Linking

ProductApptrbr supports deep linking to navigate directly to specific products.

### URL Scheme

```
productapp://product/{productId}
```

### Testing Deep Links

#### iOS

```bash
# Using npx uri-scheme
npx uri-scheme open "productapp://product/1" --ios

# Using xcrun (Simulator)
xcrun simctl openurl booted "productapp://product/1"

# Using command line (Physical device with Apple Configurator)
open -a Simulator "productapp://product/1"
```

#### Android

```bash
# Using npx uri-scheme
npx uri-scheme open "productapp://product/1" --android

# Using adb
adb shell am start -W -a android.intent.action.VIEW -d "productapp://product/1" com.productapptrbr
```

### Deep Link Configuration

Deep linking is configured in:
- **iOS**: `ios/ProductApptrbr/Info.plist` (CFBundleURLTypes)
- **Android**: `android/app/src/main/AndroidManifest.xml` (intent-filters)

## 📅 Calendar Integration

The app includes a custom native module for creating calendar events.

### Usage

When viewing a product detail page, tap the "Create Reminder" button to add a calendar event with a notification one hour from now.

### Native Module Implementation

- **iOS**: `ios/ProductApptrbr/CalendarModule.m` and `CalendarModule.swift`
- **Android**: `android/app/src/main/java/com/productapptrbr/CalendarModule.java`

### Required Permissions

#### iOS
Add to `Info.plist`:
```xml
<key>NSCalendarsUsageDescription</key>
<string>This app needs access to your calendar to create reminders</string>
```

#### Android
Add to `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
<uses-permission android:name="android.permission.READ_CALENDAR" />
```

## 🧪 Testing

### Test Structure

```
__tests__/
├── App.test.tsx                      # Root component tests
├── Home.test.tsx                     # Home page tests
├── Product.test.tsx                  # Product detail page tests
├── ProductItem.test.tsx              # Product item component tests
├── SortButton.test.tsx               # Sort button tests
├── ErrorBoundary.test.tsx            # Error boundary tests
├── NetworkStatusIndicator.test.tsx   # Network status tests
├── Navigation.integration.test.tsx   # Navigation flow tests
├── services.test.ts                  # API service tests
├── useNetworkStatus.test.ts          # Network hook tests
└── CalendarModule.test.tsx           # Native module tests
```

### Test Coverage Goals

- **Overall Coverage**: 80%+
- **Components**: 90%+
- **Services**: 95%+
- **Hooks**: 90%+

### Running Specific Test Suites

```bash
# Component tests
yarn test --testPathPattern=components

# Service tests
yarn test services.test.ts

# Integration tests
yarn test Navigation.integration.test.tsx

# Update snapshots
yarn test -u
```

## 🎨 Code Style and Standards

### TypeScript

- Strict mode enabled
- No implicit any
- Explicit function return types for public APIs
- Interface over type for object shapes

### Component Structure

```typescript
// Example component structure
import React from 'react';
import * as S from './styles';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default MyComponent;
```

### Styling

- Use Styled Components for all styling
- Follow existing naming conventions
- Keep styles colocated with components
- Use theme constants when available



## 🐛 Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

## 📚 Additional Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[COMPONENT_API.md](docs/COMPONENT_API.md)** - Component API documentation
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Architecture decisions and patterns
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`yarn test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the terms of the **GNU General Public License v3.0**.
See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DummyJSON API](https://dummyjson.com/) - Providing the product data
- [React Native Community](https://reactnative.dev/community/overview) - Amazing ecosystem and support
- [Notifee](https://notifee.app/) - Push notification library
- [@shopify/flash-list](https://shopify.github.io/flash-list/) - High-performance list component

## 📞 Support

For questions, issues, or suggestions:
- Open an [issue](https://github.com/jramalho/ProductApptrbr/issues)
- Start a [discussion](https://github.com/jramalho/ProductApptrbr/discussions)

---

**Made with ❤️ using React Native**
