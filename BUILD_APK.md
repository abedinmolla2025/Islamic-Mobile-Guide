# Building Noor Islamic Companion APK

This guide explains how to build the Android APK for the Noor Islamic Companion app.

## Option 1: GitHub Actions (Recommended)

1. Push your code to GitHub
2. Go to Actions tab
3. Run "Build Android APK" workflow
4. Download the APK from artifacts

## Option 2: Build Locally

### Prerequisites

- Node.js 20+
- Java JDK 17
- Android Studio with Android SDK
- Android SDK Build-tools 34+

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the web app:**
   ```bash
   npm run build
   ```

3. **Sync Capacitor:**
   ```bash
   npx cap sync android
   ```

4. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

5. **Build APK in Android Studio:**
   - Go to Build > Build Bundle(s) / APK(s) > Build APK(s)
   - Or use command line:
   ```bash
   cd android
   ./gradlew assembleDebug    # Debug APK
   ./gradlew assembleRelease  # Release APK (signed)
   ```

### APK Output Locations

- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

## App Configuration

### Package Details
- **App ID:** `com.noor.islamiccompanion`
- **App Name:** Noor - Islamic Companion
- **Version:** 1.0.0

### Permissions
- Internet access
- Location (for Qibla direction)
- Vibration (for notifications)
- Wake Lock (for prayer alerts)

### Keystore Info
For release builds, a keystore is required. A default one is included for testing:
- Keystore: `android/app/release-keystore.jks`
- Alias: `noor-key`
- Password: `noor123456`

**Important:** For production/Play Store release, generate your own keystore:
```bash
keytool -genkeypair -v \
  -keystore my-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias
```

## Customization

### App Icon
Replace icon files in:
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- `android/app/src/main/res/mipmap-*/ic_launcher_round.png`

### Splash Screen
Modify splash screen color in:
- `android/app/src/main/res/values/colors.xml`
- `capacitor.config.ts`

### Theme Colors
Primary colors are defined in:
- `android/app/src/main/res/values/colors.xml`
