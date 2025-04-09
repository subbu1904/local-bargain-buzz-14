
// Get browser speech recognition instance
export const getSpeechRecognition = (): SpeechRecognition | null => {
  if ('SpeechRecognition' in window) {
    return new (window as any).SpeechRecognition();
  } else if ('webkitSpeechRecognition' in window) {
    return new (window as any).webkitSpeechRecognition();
  }
  return null;
};

// Map our app language codes to Web Speech API language codes
export const getSpeechLanguage = (langCode: string): string => {
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

// Check if speech recognition is supported
export const isSpeechRecognitionSupported = (): boolean => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};
