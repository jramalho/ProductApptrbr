# Troubleshooting Guide

This guide covers common issues you might encounter while developing or running ProductApptrbr, along with their solutions.

## 📋 Table of Contents

- [Installation Issues](#installation-issues)
- [Build Issues](#build-issues)
- [Runtime Issues](#runtime-issues)
- [Development Environment](#development-environment)
- [Testing Issues](#testing-issues)
- [Platform-Specific Issues](#platform-specific-issues)

## 🔧 Installation Issues

### Yarn Install Fails

**Problem**: `yarn install` fails with dependency resolution errors

**Solutions**:

1. Clear yarn cache:
   ```bash
   yarn cache clean
   ```

2. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   yarn install
   ```

3. Check Node.js version:
   ```bash
   node --version  # Should be 18.x or higher
   ```

4. If using Yarn 2+, ensure correct version:
   ```bash
   yarn set version stable
   ```

### CocoaPods Installation Fails (iOS)

**Problem**: `pod install` fails in ios directory

**Solutions**:

1. Update CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```

2. Clean and reinstall:
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   pod cache clean --all
   pod install
   cd ..
   ```

3. If M1/M2 Mac, ensure using correct architecture:
   ```bash
   cd ios
   arch -x86_64 pod install
   cd ..
   ```

4. Check Ruby version:
   ```bash
   ruby --version  # Should be 2.7 or higher
   ```

## 🏗️ Build Issues

### Metro Bundler Issues

**Problem**: Metro bundler won't start or crashes

**Solutions**:

1. Clear Metro cache:
   ```bash
   yarn start --reset-cache
   ```

2. Clear watchman watches:
   ```bash
   watchman watch-del-all
   ```

3. Reset everything:
   ```bash
   rm -rf node_modules
   rm -rf $TMPDIR/react-*
   rm -rf $TMPDIR/metro-*
   yarn install
   yarn start --reset-cache
   ```

### Android Build Fails

**Problem**: Android build fails with Gradle errors

**Solutions**:

1. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   yarn android
   ```

2. Check Android SDK path in `android/local.properties`:
   ```properties
   sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
   ```

3. Ensure Java version is correct:
   ```bash
   java -version  # Should be JDK 17
   ```

4. Clear Gradle cache:
   ```bash
   cd android
   ./gradlew cleanBuildCache
   rm -rf .gradle
   cd ..
   ```

5. Check `ANDROID_HOME` environment variable:
   ```bash
   echo $ANDROID_HOME
   # Should point to Android SDK location
   ```

### iOS Build Fails

**Problem**: Xcode build fails

**Solutions**:

1. Clean build folder in Xcode:
   - Open Xcode: `open ios/ProductApptrbr.xcworkspace`
   - Menu: Product → Clean Build Folder (⇧⌘K)

2. Delete derived data:
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData/*
   ```

3. Reinstall pods:
   ```bash
   cd ios
   rm -rf Pods
   pod install
   cd ..
   ```

4. Check code signing:
   - Open project in Xcode
   - Select target → Signing & Capabilities
   - Ensure valid team and provisioning profile

5. Clean and rebuild:
   ```bash
   cd ios
   xcodebuild clean -workspace ProductApptrbr.xcworkspace -scheme ProductApptrbr
   cd ..
   yarn ios
   ```

## 🏃 Runtime Issues

### App Crashes on Launch

**Problem**: App crashes immediately after launching

**Solutions**:

1. Check Metro bundler is running:
   ```bash
   yarn start
   ```

2. Ensure native dependencies are installed:
   ```bash
   # iOS
   cd ios && pod install && cd ..
   
   # Android
   cd android && ./gradlew clean && cd ..
   ```

3. Clear app data:
   - **iOS**: Delete app and reinstall
   - **Android**: Settings → Apps → ProductApptrbr → Clear Data

4. Check for JavaScript errors in Metro console

5. Verify device/simulator compatibility (iOS 13+, Android 5.0+)

### Network Requests Fail

**Problem**: API calls fail or timeout

**Solutions**:

1. Check internet connection

2. Verify API endpoint:
   ```typescript
   // src/constants/index.ts
   export const BASE_URL = 'https://dummyjson.com/products';
   ```

3. iOS: Update App Transport Security in `Info.plist`:
   ```xml
   <key>NSAppTransportSecurity</key>
   <dict>
     <key>NSAllowsArbitraryLoads</key>
     <true/>
   </dict>
   ```

4. Android: Ensure `uses-permission` in `AndroidManifest.xml`:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```

5. Check for network proxy or firewall issues

### Deep Links Don't Work

**Problem**: Deep links don't open the app or navigate correctly

**Solutions**:

1. Verify URL scheme configuration:
   - **iOS**: `ios/ProductApptrbr/Info.plist` contains `CFBundleURLTypes`
   - **Android**: `android/app/src/main/AndroidManifest.xml` has correct `intent-filter`

2. Test with correct format:
   ```bash
   # iOS
   npx uri-scheme open "productapp://product/1" --ios
   
   # Android
   npx uri-scheme open "productapp://product/1" --android
   ```

3. Rebuild app after changing configuration:
   ```bash
   # iOS
   cd ios && pod install && cd ..
   yarn ios
   
   # Android
   yarn android
   ```

4. Check linking configuration in `App.tsx`

### Calendar Module Errors

**Problem**: Calendar integration doesn't work

**Solutions**:

1. Verify permissions are requested:
   - **iOS**: `Info.plist` has `NSCalendarsUsageDescription`
   - **Android**: `AndroidManifest.xml` has calendar permissions

2. Check native module linking:
   ```bash
   # iOS
   cd ios && pod install && cd ..
   
   # Android - verify module registered in MainApplication.java
   ```

3. Request permissions at runtime:
   ```typescript
   // iOS example
   import { PermissionsAndroid } from 'react-native';
   
   const granted = await PermissionsAndroid.request(
     PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR
   );
   ```

4. Rebuild after adding permissions

### Push Notifications Not Working

**Problem**: Notifee notifications don't appear

**Solutions**:

1. Check Notifee initialization in `App.tsx`

2. Request notification permissions:
   ```typescript
   import notifee from '@notifee/react-native';
   
   await notifee.requestPermission();
   ```

3. Verify channel is created (Android):
   ```typescript
   await notifee.createChannel({
     id: 'default',
     name: 'Default Channel',
   });
   ```

4. Check device notification settings

5. Test with simple notification:
   ```typescript
   await notifee.displayNotification({
     title: 'Test',
     body: 'Testing notifications',
   });
   ```

## 💻 Development Environment

### VS Code Issues

**Problem**: TypeScript errors or IntelliSense not working

**Solutions**:

1. Restart TypeScript server:
   - CMD/CTRL + Shift + P
   - Type: "TypeScript: Restart TS Server"

2. Ensure TypeScript extension is installed

3. Check `tsconfig.json` is valid

4. Clear VS Code cache:
   ```bash
   rm -rf ~/.vscode
   ```

### Watchman Issues

**Problem**: File changes not detected or slow

**Solutions**:

1. Restart watchman:
   ```bash
   watchman shutdown-server
   watchman watch-del-all
   ```

2. Increase file watch limit (Linux):
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

3. Reinstall watchman:
   ```bash
   brew uninstall watchman
   brew install watchman
   ```

## 🧪 Testing Issues

### Tests Fail

**Problem**: Jest tests fail unexpectedly

**Solutions**:

1. Clear Jest cache:
   ```bash
   yarn test --clearCache
   ```

2. Update snapshots:
   ```bash
   yarn test -u
   ```

3. Run specific test file:
   ```bash
   yarn test <filename>
   ```

4. Check for async issues:
   - Use `waitFor` for async operations
   - Ensure promises are resolved

5. Verify mocks are correct in `__mocks__`

### Coverage Report Issues

**Problem**: Coverage report is inaccurate

**Solutions**:

1. Clear coverage directory:
   ```bash
   rm -rf coverage
   ```

2. Run with fresh cache:
   ```bash
   yarn test --coverage --clearCache
   ```

3. Check `jest.config.js` collectCoverageFrom patterns

## 📱 Platform-Specific Issues

### iOS Simulator Issues

**Problem**: Simulator won't start or is slow

**Solutions**:

1. Reset simulator:
   - Simulator → Device → Erase All Content and Settings

2. Kill and restart:
   ```bash
   killall Simulator
   open -a Simulator
   ```

3. Free up disk space (simulators need significant space)

4. Update Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```

### Android Emulator Issues

**Problem**: Emulator won't start or crashes

**Solutions**:

1. Check virtualization is enabled in BIOS

2. Increase emulator RAM in AVD Manager

3. Cold boot emulator:
   - Android Studio → AVD Manager
   - Dropdown → Cold Boot Now

4. Wipe emulator data:
   - Android Studio → AVD Manager
   - Dropdown → Wipe Data

5. Check HAXM installation (Intel processors):
   ```bash
   # macOS
   /usr/local/Caskroom/android-sdk/*/system-images/haxm/silent_install.sh
   ```

### Android USB Debugging Issues

**Problem**: Physical device not recognized

**Solutions**:

1. Enable Developer Options on device:
   - Settings → About Phone → Tap Build Number 7 times

2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging

3. Check device connection:
   ```bash
   adb devices
   ```

4. Restart adb server:
   ```bash
   adb kill-server
   adb start-server
   ```

5. Check USB cable (use data cable, not charge-only)

6. Install device drivers (Windows)

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check existing issues**: [GitHub Issues](https://github.com/jramalho/ProductApptrbr/issues)
2. **Search discussions**: [GitHub Discussions](https://github.com/jramalho/ProductApptrbr/discussions)
3. **Create new issue**: Include:
   - Detailed description
   - Steps to reproduce
   - Environment info (OS, versions, device)
   - Error messages and logs
   - What you've already tried

## 📚 Additional Resources

- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)
- [Metro Configuration](https://facebook.github.io/metro/docs/configuration)
- [Xcode Troubleshooting](https://developer.apple.com/documentation/xcode)
- [Android Studio Troubleshooting](https://developer.android.com/studio/troubleshoot)
