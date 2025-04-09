
import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSpeechLanguage } from '@/utils/speechUtils';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

const VoiceSearch = ({ onResult }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionAPI();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = getSpeechLanguage(currentLanguage);
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
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
  }, [currentLanguage, onResult, toast, t]);

  const toggleListening = () => {
    if (!isSupported || !recognition) return;
    
    if (isListening) {
      recognition.abort();
      setIsListening(false);
    } else {
      try {
        recognition.lang = getSpeechLanguage(currentLanguage);
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
      className={`rounded-full transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-gray-700'}`}
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
