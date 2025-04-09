
import { toast } from '@/components/ui/use-toast';

// Check if the app can be installed (not already installed and not on iOS)
export const canInstallPWA = (): boolean => {
  // Check if the app is already in standalone mode (installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false;
  }
  
  // Check for iOS devices (which don't support standard PWA installation)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  if (isIOS) {
    return false;
  }
  
  return true;
};

// Check if the app is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Register for online/offline events
export const registerConnectivityListeners = (
  onOnline: () => void,
  onOffline: () => void
): () => void => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

// Handle app updates when available
export const handleAppUpdate = (): void => {
  // This function would be called when a service worker update is detected
  toast({
    title: "Update Available",
    description: "A new version of the app is available. Refresh to update.",
    duration: 10000,
  });
};

// Check if service workers are supported
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};
