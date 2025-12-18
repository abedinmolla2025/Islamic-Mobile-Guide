import { useEffect } from 'react';
import { showBannerAd, hideBannerAd } from '@/lib/admob';

export function AdBanner() {
  useEffect(() => {
    // Show banner ad on component mount
    const displayAd = async () => {
      try {
        await showBannerAd();
      } catch (error) {
        console.log('Ad banner not available (likely in browser)');
      }
    };

    displayAd();

    // Hide banner on unmount
    return () => {
      hideBannerAd().catch(() => {
        // Silently handle errors
      });
    };
  }, []);

  // Placeholder for web/dev environment
  return (
    <div className="bg-muted p-2 text-center text-xs text-muted-foreground mt-4 rounded-md">
      Advertisement
    </div>
  );
}
