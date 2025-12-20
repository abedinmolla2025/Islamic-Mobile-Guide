# Google Play Store - নুর অ্যাপ AAB বিল্ড গাইড

## প্রয়োজনীয় সেটআপ

### 1. Android Studio ডাউনলোড করুন
- [Android Studio](https://developer.android.com/studio) ডাউনলোড করুন
- Android SDK 35 install করুন

### 2. Android Keystore তৈরি করুন

```bash
# একবার keystore তৈরি করুন (নিরাপদ জায়গায় রাখুন)
keytool -genkey -v -keystore release-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias noor-key \
  -storepass noor123456 \
  -keypass noor123456
```

**গুরুত্বপূর্ণ:** এই keystore ফাইল হারিয়ে যেতে দিবেন না! Google Play-এ নতুন app আপডেট upload করতে এটাই লাগবে।

### 3. আপনার machine-এ প্রজেক্ট setup করুন

```bash
# প্রজেক্ট clone করুন
git clone <your-project-repo>
cd noor-app

# Dependencies install করুন
npm install

# Web assets build করুন
npm run build

# Capacitor sync করুন
npx cap sync android
```

### 4. Release APK/AAB বিল্ড করুন

#### Option A: Android Studio থেকে (সহজ)
1. Android Studio খুলুন → `android` ফোল্ডার open করুন
2. Menu: `Build` → `Generate Signed Bundle / APK`
3. নিম্নলিখিত তথ্য fill করুন:
   - Keystore path: `android/app/release-keystore.jks`
   - Keystore password: `noor123456`
   - Key alias: `noor-key`
   - Key password: `noor123456`
4. `Release` select করুন
5. `Create` click করুন

#### Option B: Command Line থেকে (Advanced)

```bash
# AAB বিল্ড করুন (Google Play এর জন্য recommended)
cd android
./gradlew bundleRelease

# APK বিল্ড করুন (testing এর জন্য)
./gradlew assembleRelease
```

**Output locations:**
- **AAB:** `android/app/build/outputs/bundle/release/app-release.aab`
- **APK:** `android/app/build/outputs/apk/release/app-release.apk`

## Google Play Store এ Upload করার পদক্ষেপ

### 1. Google Play Developer Account তৈরি করুন
- [Google Play Console](https://play.google.com/console) এ যান
- $25 registration ফি পরিশোধ করুন

### 2. নতুন App তৈরি করুন
- Console-এ "Create app" click করুন
- App details fill করুন:
  - **App name:** Noor - Islamic Companion
  - **Default language:** English
  - **App category:** Lifestyle

### 3. App Listing পূরণ করুন
- Screenshots (স্মার্টফোন, tablet)
- Feature graphic (1024x500 px)
- Short description
- Full description
- Privacy policy
- Contact email

### 4. Release Setup

#### Content Rating
- "Content rating" form পূরণ করুন
- Noor-এর জন্য সব age groups safe

#### Pricing & Distribution
- Pricing: Free select করুন
- Countries: সব country select করুন

#### Create Release
1. "Testing" → "Internal testing" এ যান
2. "Create new release" click করুন
3. Built AAB file upload করুন
4. Release notes লিখুন: "নূর - ইসলামিক সঙ্গী v1.0.0"
5. "Review release" → "Start rollout to internal testing"

#### Production Release
1. "Production" track এ যান
2. "Create new release" click করুন
3. Internal testing থেকে পাস করা AAB upload করুন
4. "Review release" click করুন
5. "Rollout to production" click করুন

## Troubleshooting

### Build Error: Gradle failed
```bash
cd android
./gradlew clean
npx cap sync android
./gradlew bundleRelease
```

### KeyStore issues
- Keystore password ভুল? → `noor123456` (case-sensitive)
- Key alias: `noor-key`
- Keystore path: `android/app/release-keystore.jks`

### Upload Error: Different certificate
- **একই keystore ব্যবহার করুন** - প্রথম upload এর পর আর change করা যায় না!

## অ্যাপ Signing Configuration

আপনার keystore information:

```
Alias: noor-key
Keystore password: noor123456
Key password: noor123456
Validity: 10 years
Algorithm: RSA, 2048-bit
```

## App Details

- **Package name:** com.noor.islamiccompanion
- **App name:** Noor - Islamic Companion
- **Version:** 1.0.0 (versionCode: 1)
- **Min SDK:** Android 6.0 (API 23)
- **Target SDK:** Android 15 (API 35)

## প্রয়োজনীয় Screenshots

Google Play-এ upload করার জন্য minimum:
- 2টি phone screenshots (5.5 inch)
- 1টি tablet screenshot (7 inch)
- 1টি feature graphic (1024x500 px)

## Support & Help

যদি সমস্যা হয়:
1. [Android Developer Docs](https://developer.android.com)
2. [Google Play Console Help](https://support.google.com/googleplay/android-developer)
3. Gradle build output check করুন

## নিরাপত্তা নোটিস

⚠️ **গুরুত্বপূর্ণ:**
- Keystore file কখনো public repository-তে push করবেন না
- Passwords secure place-এ রাখুন
- Keystore হারিয়ে গেলে আর same app update করতে পারবেন না
