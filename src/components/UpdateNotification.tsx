
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UpdateNotificationProps {
  reloadPage: () => void;
  updateAvailable: boolean;
}

const UpdateNotification = ({ reloadPage, updateAvailable }: UpdateNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (updateAvailable) {
      setIsVisible(true);
    }
  }, [updateAvailable]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50 animate-fade-in-up">
      <div className="flex items-start">
        <div className="mr-3 bg-blue-500 rounded-full p-2 text-white">
          <RefreshCw className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-1">{t('app_updated')}</h3>
          <p className="text-xs text-gray-600 mb-3">A new version is available. Refresh to update.</p>
          <Button 
            size="sm" 
            onClick={() => {
              setIsVisible(false);
              reloadPage();
            }}
            className="bg-blue-500 hover:bg-blue-600 w-full justify-center"
          >
            {t('refresh')}
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
