
import { toast } from "@/components/ui/use-toast";

// Register service worker for PWA
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker registered with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Check for new service worker update
export const checkForUpdate = (registration: ServiceWorkerRegistration, callback: (updateAvailable: boolean) => void) => {
  if (!registration) return;

  // When a new service worker is available
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    if (!newWorker) return;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New service worker is installed, but waiting to activate
        callback(true);
      }
    });
  });

  // Also check immediately for updates
  registration.update().catch(error => {
    console.error('Error checking for service worker updates:', error);
  });
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    toast({
      title: "Notifications Not Supported",
      description: "This browser does not support desktop notifications",
    });
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Send a test notification
export const sendTestNotification = async () => {
  const hasPermission = await requestNotificationPermission();
  
  if (!hasPermission) {
    toast({
      title: "Permission Denied",
      description: "Notification permission was denied",
      variant: "destructive",
    });
    return;
  }
  
  const notification = new Notification("Welcome to Flipssi", {
    body: "You will receive notifications about new listings and messages.",
    icon: "/pwa-192x192.png"
  });
  
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
};

// Detect if the app is installed (in standalone mode)
export const isAppInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches;
};
