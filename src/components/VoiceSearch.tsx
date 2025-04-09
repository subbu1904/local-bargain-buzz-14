
import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

const VoiceSearch = ({ onResult }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();
  const { t, currentLanguage } = useLanguage();

  // Map language codes to SpeechRecognition language codes
  const getSpeechRecognitionLanguage = (langCode: string) => {
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'bn': 'bn-IN',
      'kn': 'kn-IN'
    };
    return langMap[langCode] || 'en-US';
  };

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = getSpeechRecognitionLanguage(currentLanguage);
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: 'Error',
          description: `Failed to recognize speech: ${event.error}`,
          variant: 'destructive',
        });
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      setIsSupported(false);
      toast({
        title: 'Not Supported',
        description: t('voice_not_supported'),
        variant: 'destructive',
      });
    }
    
    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.onerror = null;
        if (isListening) {
          recognition.abort();
        }
      }
    };
  }, [currentLanguage]);

  const toggleListening = () => {
    if (!isSupported || !recognition) return;
    
    if (isListening) {
      recognition.abort();
      setIsListening(false);
    } else {
      try {
        recognition.lang = getSpeechRecognitionLanguage(currentLanguage);
        recognition.start();
        setIsListening(true);
        toast({
          title: t('listening'),
          description: t('voice_search'),
        });
      } catch (error) {
        console.error('Speech recognition error:', error);
        toast({
          title: 'Error',
          description: 'Failed to start speech recognition',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleListening}
      disabled={!isSupported}
      className={`rounded-full transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : ''}`}
      aria-label={t('voice_search')}
      title={t('voice_search')}
    >
      {isListening ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : isSupported ? (
        <Mic className="h-5 w-5" />
      ) : (
        <MicOff className="h-5 w-5" />
      )}
    </Button>
  );
};

export default VoiceSearch;
