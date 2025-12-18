import { AdMob } from '@capacitor-community/admob';

// Replace these with your actual AdMob IDs from Google AdMob console
export const ADMOB_CONFIG = {
  appId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
  bannerAdUnitId: 'ca-app-pub-3940256099942544/6300978111', // Test banner
  interstitialAdUnitId: 'ca-app-pub-3940256099942544/1033173712', // Test interstitial
  rewardedAdUnitId: 'ca-app-pub-3940256099942544/5224354917', // Test rewarded
};

export const initAdMob = async () => {
  try {
    await AdMob.initialize();
    console.log('AdMob initialized');
  } catch (error) {
    console.error('AdMob init error:', error);
  }
};

export const showBannerAd = async () => {
  try {
    const { BannerAdPosition, BannerAdSize } = AdMob;
    await AdMob.showBanner({
      adUnitId: ADMOB_CONFIG.bannerAdUnitId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM,
      margin: 0,
      isTesting: true,
    });
  } catch (error) {
    console.log('Banner ad not available (web/dev mode):', error);
  }
};

export const hideBannerAd = async () => {
  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.log('Hide banner error:', error);
  }
};

export const showInterstitialAd = async () => {
  try {
    await AdMob.prepareInterstitial({
      adUnitId: ADMOB_CONFIG.interstitialAdUnitId,
      isTesting: true,
    });
    await AdMob.showInterstitial();
  } catch (error) {
    console.log('Interstitial ad error:', error);
  }
};

export const showRewardedAd = async () => {
  try {
    await AdMob.prepareRewardVideoAd({
      adUnitId: ADMOB_CONFIG.rewardedAdUnitId,
      isTesting: true,
    });
    await AdMob.showRewardVideoAd();
  } catch (error) {
    console.log('Rewarded ad error:', error);
  }
};
