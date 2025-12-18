# Google AdMob Setup Guide

This guide explains how to integrate and configure Google AdMob for the Noor Islamic Companion app.

## Step 1: Create Google AdMob Account

1. Go to [AdMob Console](https://admob.google.com)
2. Sign in with your Google account
3. Create a new app by clicking "Create App"
4. Select "Android" as the platform
5. Fill in app name: "Noor - Islamic Companion"

## Step 2: Create Ad Units

After creating your app, create these ad units:

### Banner Ad Unit
1. Click "Ad Units" > "Create new ad unit"
2. Format: Banner
3. Description: "Home Page Banner"
4. Copy the Ad Unit ID (e.g., `ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy`)

### Interstitial Ad Unit (Optional)
1. Click "Ad Units" > "Create new ad unit"
2. Format: Interstitial
3. Description: "Page Navigation Interstitial"
4. Copy the Ad Unit ID

### Rewarded Ad Unit (Optional)
1. Click "Ad Units" > "Create new ad unit"
2. Format: Rewarded
3. Description: "Feature Unlock Reward"
4. Copy the Ad Unit ID

## Step 3: Update Configuration

Edit `client/src/lib/admob.ts` and replace the placeholder IDs:

```typescript
export const ADMOB_CONFIG = {
  appId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy', // Your App ID from AdMob
  bannerAdUnitId: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy', // Your Banner ID
  interstitialAdUnitId: 'ca-app-pub-xxxxxxxxxxxxxxxx/zzzzzzzzzz', // Your Interstitial ID
  rewardedAdUnitId: 'ca-app-pub-xxxxxxxxxxxxxxxx/aaaaaaaaaaa', // Your Rewarded ID
};
```

## Step 4: Configure in Android

1. Update `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest>
  <application>
    <!-- Add AdMob App ID -->
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
  </application>
</manifest>
```

2. Ensure `build.gradle` includes Google Mobile Ads SDK:

```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-ads:22.6.0'
}
```

## Step 5: Build and Test

### Testing with Sample IDs (Development)
The current configuration uses Google's sample Ad Unit IDs for testing:
- Banner: `ca-app-pub-3940256099942544/6300978111`
- Interstitial: `ca-app-pub-3940256099942544/1033173712`
- Rewarded: `ca-app-pub-3940256099942544/5224354917`

Test ads will display with "Test Ad" label. Use these for development and testing.

### Switching to Production
Once ready for production:
1. Replace sample IDs with your actual Ad Unit IDs in `client/src/lib/admob.ts`
2. Change `isTesting: false` when showing ads
3. Rebuild and deploy APK

## Step 6: Usage in Components

### Show Banner Ad
```typescript
import { showBannerAd } from '@/lib/admob';

useEffect(() => {
  showBannerAd();
}, []);
```

### Show Interstitial Ad (Full-screen)
```typescript
import { showInterstitialAd } from '@/lib/admob';

// Show before navigation
await showInterstitialAd();
navigate('/next-page');
```

### Show Rewarded Ad
```typescript
import { showRewardedAd } from '@/lib/admob';

const handleReward = async () => {
  await showRewardedAd();
  // Grant reward when user watches the ad
};
```

## Monetization Strategies for Islamic App

1. **Banner Ads** - Bottom/top of pages (non-intrusive)
2. **Interstitial Ads** - Between section transitions
3. **Rewarded Ads** - Premium features (e.g., "Watch ad for bonus recitations")
4. **Premium Version** - In-app purchases for ad-free experience

## Important Notes

- Test on actual Android devices, not emulator
- AdMob requires app to be published on Play Store for real ads
- Never click your own ads in production
- Respect user experience - don't overload with ads
- AdMob policies: [Review guidelines](https://support.google.com/admob/answer/6128543)

## Revenue Tracking

Monitor earnings in AdMob console:
1. Go to [AdMob Console](https://admob.google.com)
2. View "Estimated earnings" dashboard
3. Check performance by ad unit and date

## Troubleshooting

### Ads not showing
- Ensure Ad Unit IDs are correct
- Check app ID matches AdMob console
- Verify AndroidManifest.xml has AdMob meta-data
- Test on physical Android device

### Low revenue
- Optimize ad placement for viewability
- Test different ad formats
- Increase user engagement
- Consider multiple revenue streams
