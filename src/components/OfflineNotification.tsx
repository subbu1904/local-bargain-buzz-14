import { useState, useEffect } from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Keep the notification visible briefly when coming back online
      setTimeout(() => {
        setShowOffline(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOffline) return null;

  return (
    <div className={`fixed top-16 left-0 right-0 z-50 transition-transform duration-500 ${showOffline ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={`flex items-center justify-center p-3 ${isOnline ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <>
              <Wifi className="h-5 w-5" />
              <span className="font-medium">You're back online!</span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5" />
              <span className="font-medium">{t('offline_message')}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineNotification;
