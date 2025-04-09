
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent;
  }
}

const InstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user already dismissed the prompt
    const hasUserDismissed = localStorage.getItem('pwaPromptDismissed');
    if (hasUserDismissed === 'true') {
      setDismissed(true);
      return;
    }

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Show the install prompt
    await installPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the saved prompt since it can't be used again
    setInstallPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  if (!showPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50 animate-fade-in-up">
      <button onClick={handleDismiss} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start">
        <div className="mr-3 bg-flipssi-purple rounded-full p-2 text-white">
          <Download className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-1">{t('install_app')}</h3>
          <p className="text-xs text-gray-600 mb-3">{t('install_prompt')}</p>
          <Button 
            size="sm" 
            onClick={handleInstallClick}
            className="bg-flipssi-purple hover:bg-purple-700 w-full justify-center"
          >
            {t('install_app')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
