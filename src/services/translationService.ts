
// Available languages
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
];

// Translations for different languages
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'home': 'Home',
    'browse': 'Browse',
    'categories': 'Categories',
    'about': 'About',
    
    // Auth
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'log_out': 'Log Out',
    
    // Search
    'search_placeholder': 'What are you looking for?',
    'search': 'Search',
    'voice_search': 'Search with voice',
    'listening': 'Listening...',
    'voice_not_supported': 'Voice recognition not supported',
    
    // Categories
    'browse_categories': 'Browse Categories',
    'electronics': 'Electronics',
    'furniture': 'Furniture',
    'vehicles': 'Vehicles',
    'clothing': 'Clothing',
    'home': 'Home',
    'all_categories': 'All Categories',
    
    // Listings
    'featured_listings': 'Featured Listings',
    'view_all': 'View All',
    'new': 'New',
    'post_for_free': 'Post For Free',
    
    // Footer
    'about_us': 'About Us',
    'how_it_works': 'How It Works',
    'safety_tips': 'Safety Tips',
    'faq': 'FAQ',
    'contact_us': 'Contact Us',
    'terms': 'Terms',
    'privacy': 'Privacy',
    'cookies': 'Cookies',
    'copyright': 'All rights reserved',
    
    // PWA
    'install_app': 'Install App',
    'install_prompt': 'Install this app on your device',
    'notifications': 'Notifications',
    'enable_notifications': 'Enable Notifications',
    'offline_mode': 'Offline Mode',
    'offline_message': 'You are currently offline',
    'app_updated': 'App Updated',
    'refresh': 'Refresh',
    
    // Language
    'language': 'Language',
    'select_language': 'Select Language',
  },
  
  hi: {
    // Navigation
    'home': 'होम',
    'browse': 'ब्राउज़',
    'categories': 'श्रेणियाँ',
    'about': 'हमारे बारे में',
    
    // Auth
    'sign_in': 'साइन इन',
    'sign_up': 'साइन अप',
    'log_out': 'लॉग आउट',
    
    // Search
    'search_placeholder': 'आप क्या ढूंढ रहे हैं?',
    'search': 'खोज',
    'voice_search': 'आवाज से खोजें',
    'listening': 'सुन रहा है...',
    'voice_not_supported': 'आवाज पहचान समर्थित नहीं है',
    
    // Categories
    'browse_categories': 'श्रेणियां ब्राउज़ करें',
    'electronics': 'इलेक्ट्रॉनिक्स',
    'furniture': 'फर्नीचर',
    'vehicles': 'वाहन',
    'clothing': 'कपड़े',
    'home': 'घर',
    'all_categories': 'सभी श्रेणियाँ',
    
    // Listings
    'featured_listings': 'विशेष लिस्टिंग',
    'view_all': 'सभी देखें',
    'new': 'नया',
    'post_for_free': 'मुफ्त में पोस्ट करें',
    
    // Footer
    'about_us': 'हमारे बारे में',
    'how_it_works': 'यह कैसे काम करता है',
    'safety_tips': 'सुरक्षा टिप्स',
    'faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'contact_us': 'संपर्क करें',
    'terms': 'शर्तें',
    'privacy': 'गोपनीयता',
    'cookies': 'कुकीज़',
    'copyright': 'सर्वाधिकार सुरक्षित',
    
    // PWA
    'install_app': 'ऐप इंस्टॉल करें',
    'install_prompt': 'इस ऐप को अपने डिवाइस पर इंस्टॉल करें',
    'notifications': 'सूचनाएं',
    'enable_notifications': 'सूचनाएं सक्षम करें',
    'offline_mode': 'ऑफलाइन मोड',
    'offline_message': 'आप वर्तमान में ऑफलाइन हैं',
    'app_updated': 'ऐप अपडेट हुआ',
    'refresh': 'रीफ्रेश',
    
    // Language
    'language': 'भाषा',
    'select_language': 'भाषा चुनें',
  },
  
  ta: {
    // Navigation
    'home': 'முகப்பு',
    'browse': 'உலாவு',
    'categories': 'வகைகள்',
    'about': 'எங்களை பற்றி',
    
    // Auth
    'sign_in': 'உள்நுழைக',
    'sign_up': 'பதிவு செய்க',
    'log_out': 'வெளியேறு',
    
    // Search
    'search_placeholder': 'நீங்கள் எதை தேடுகிறீர்கள்?',
    'search': 'தேடல்',
    'voice_search': 'குரல் மூலம் தேடு',
    'listening': 'கேட்கிறது...',
    'voice_not_supported': 'குரல் அங்கீகாரம் ஆதரிக்கப்படவில்லை',
    
    // Categories
    'browse_categories': 'வகைகளை உலாவு',
    'electronics': 'மின்னணு சாதனங்கள்',
    'furniture': 'தளபாடங்கள்',
    'vehicles': 'வாகனங்கள்',
    'clothing': 'ஆடைகள்',
    'home': 'வீடு',
    'all_categories': 'அனைத்து வகைகளும்',
    
    // Listings
    'featured_listings': 'சிறப்பு பட்டியல்கள்',
    'view_all': 'அனைத்தையும் காண்க',
    'new': 'புதியது',
    'post_for_free': 'இலவசமாக பதிவிடுக',
    
    // Footer
    'about_us': 'எங்களை பற்றி',
    'how_it_works': 'இது எப்படி செயல்படுகிறது',
    'safety_tips': 'பாதுகாப்பு குறிப்புகள்',
    'faq': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'contact_us': 'எங்களை தொடர்பு கொள்ள',
    'terms': 'விதிமுறைகள்',
    'privacy': 'தனியுரிமை',
    'cookies': 'குக்கீகள்',
    'copyright': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
    
    // PWA
    'install_app': 'பயன்பாட்டை நிறுவு',
    'install_prompt': 'இந்த பயன்பாட்டை உங்கள் சாதனத்தில் நிறுவுக',
    'notifications': 'அறிவிப்புகள்',
    'enable_notifications': 'அறிவிப்புகளை இயக்கு',
    'offline_mode': 'ஆஃப்லைன் முறை',
    'offline_message': 'நீங்கள் தற்போது ஆஃப்லைனில் உள்ளீர்கள்',
    'app_updated': 'பயன்பாடு புதுப்பிக்கப்பட்டது',
    'refresh': 'புதுப்பிக்க',
    
    // Language
    'language': 'மொழி',
    'select_language': 'மொழியை தேர்ந்தெடுக்கவும்',
  },
  
  te: {
    // Navigation
    'home': 'హోమ్',
    'browse': 'బ్రౌజ్',
    'categories': 'వర్గాలు',
    'about': 'మా గురించి',
    
    // Auth
    'sign_in': 'సైన్ ఇన్',
    'sign_up': 'సైన్ అప్',
    'log_out': 'లాగ్ అవుట్',
    
    // Search
    'search_placeholder': 'మీరు ఏమి వెతుకుతున్నారు?',
    'search': 'శోధన',
    'voice_search': 'వాయిస్ ద్వారా శోధించండి',
    'listening': 'వింటున్నాము...',
    'voice_not_supported': 'వాయిస్ గుర్తింపు మద్దతు లేదు',
    
    // Categories
    'browse_categories': 'వర్గాలను బ్రౌజ్ చేయండి',
    'electronics': 'ఎలక్ట్రానిక్స్',
    'furniture': 'ఫర్నిచర్',
    'vehicles': 'వాహనాలు',
    'clothing': 'దుస్తులు',
    'home': 'ఇల్లు',
    'all_categories': 'అన్ని వర్గాలు',
    
    // Listings
    'featured_listings': 'ఫీచర్డ్ లిస్టింగ్స్',
    'view_all': 'అన్నీ చూడండి',
    'new': 'కొత్త',
    'post_for_free': 'ఉచితంగా పోస్ట్ చేయండి',
    
    // Footer
    'about_us': 'మా గురించి',
    'how_it_works': 'ఇది ఎలా పని చేస్తుంది',
    'safety_tips': 'భద్రతా చిట్కాలు',
    'faq': 'తరచుగా అడిగే ప్రశ్నలు',
    'contact_us': 'మమ్మల్ని సంప్రదించండి',
    'terms': 'నియమాలు',
    'privacy': 'గోప్యత',
    'cookies': 'కుకీలు',
    'copyright': 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి',
    
    // PWA
    'install_app': 'యాప్ ఇన్స్టాల్ చేయండి',
    'install_prompt': 'ఈ యాప్‌ని మీ పరికరంలో ఇన్‌స్టాల్ చేయండి',
    'notifications': 'నోటిఫికేషన్లు',
    'enable_notifications': 'నోటిఫికేషన్లను ప్రారంభించు',
    'offline_mode': 'ఆఫ్‌లైన్ మోడ్',
    'offline_message': 'మీరు ప్రస్తుతం ఆఫ్‌లైన్‌లో ఉన్నారు',
    'app_updated': 'యాప్ అప్డేట్ అయింది',
    'refresh': 'రిఫ్రెష్',
    
    // Language
    'language': 'భాష',
    'select_language': 'భాషను ఎంచుకోండి',
  },
  
  bn: {
    // Navigation
    'home': 'হোম',
    'browse': 'ব্রাউজ',
    'categories': 'বিভাগসমূহ',
    'about': 'আমাদের সম্পর্কে',
    
    // Auth
    'sign_in': 'সাইন ইন',
    'sign_up': 'সাইন আপ',
    'log_out': 'লগ আউট',
    
    // Search
    'search_placeholder': 'আপনি কী খুঁজছেন?',
    'search': 'অনুসন্ধান',
    'voice_search': 'ভয়েস দিয়ে অনুসন্ধান',
    'listening': 'শুনছে...',
    'voice_not_supported': 'ভয়েস শনাক্তকরণ সমর্থিত নয়',
    
    // Categories
    'browse_categories': 'বিভাগসমূহ ব্রাউজ করুন',
    'electronics': 'ইলেকট্রনিক্স',
    'furniture': 'আসবাবপত্র',
    'vehicles': 'যানবাহন',
    'clothing': 'পোশাক',
    'home': 'বাড়ি',
    'all_categories': 'সব বিভাগ',
    
    // Listings
    'featured_listings': 'বিশেষ তালিকা',
    'view_all': 'সব দেখুন',
    'new': 'নতুন',
    'post_for_free': 'বিনামূল্যে পোস্ট করুন',
    
    // Footer
    'about_us': 'আমাদের সম্পর্কে',
    'how_it_works': 'এটি কিভাবে কাজ করে',
    'safety_tips': 'নিরাপত্তা টিপস',
    'faq': 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী',
    'contact_us': 'যোগাযোগ করুন',
    'terms': 'শর্তাবলী',
    'privacy': 'গোপনীয়তা',
    'cookies': 'কুকিজ',
    'copyright': 'সর্বস্বত্ব সংরক্ষিত',
    
    // PWA
    'install_app': 'অ্যাপ ইনস্টল করুন',
    'install_prompt': 'আপনার ডিভাইসে এই অ্যাপটি ইনস্টল করুন',
    'notifications': 'বিজ্ঞপ্তি',
    'enable_notifications': 'বিজ্ঞপ্তি সক্ষম করুন',
    'offline_mode': 'অফলাইন মোড',
    'offline_message': 'আপনি বর্তমানে অফলাইনে আছেন',
    'app_updated': 'অ্যাপ আপডেট হয়েছে',
    'refresh': 'রিফ্রেশ',
    
    // Language
    'language': 'ভাষা',
    'select_language': 'ভাষা নির্বাচন করুন',
  },
  
  kn: {
    // Navigation
    'home': 'ಮುಖಪುಟ',
    'browse': 'ಬ್ರೌಸ್',
    'categories': 'ವರ್ಗಗಳು',
    'about': 'ನಮ್ಮ ಬಗ್ಗೆ',
    
    // Auth
    'sign_in': 'ಸೈನ್ ಇನ್',
    'sign_up': 'ಸೈನ್ ಅಪ್',
    'log_out': 'ಲಾಗ್ ಔಟ್',
    
    // Search
    'search_placeholder': 'ನೀವು ಏನನ್ನು ಹುಡುಕುತ್ತಿದ್ದೀರಿ?',
    'search': 'ಹುಡುಕಿ',
    'voice_search': 'ಧ್ವನಿಯಿಂದ ಹುಡುಕಿ',
    'listening': 'ಕೇಳುತ್ತಿದೆ...',
    'voice_not_supported': 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ',
    
    // Categories
    'browse_categories': 'ವರ್ಗಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    'electronics': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್',
    'furniture': 'ಫರ್ನಿಚರ್',
    'vehicles': 'ವಾಹನಗಳು',
    'clothing': 'ಬಟ್ಟೆಗಳು',
    'home': 'ಮನೆ',
    'all_categories': 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    
    // Listings
    'featured_listings': 'ವಿಶೇಷ ಪಟ್ಟಿಗಳು',
    'view_all': 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
    'new': 'ಹೊಸದು',
    'post_for_free': 'ಉಚಿತವಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಿ',
    
    // Footer
    'about_us': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'how_it_works': 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    'safety_tips': 'ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು',
    'faq': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    'contact_us': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'terms': 'ನಿಯಮಗಳು',
    'privacy': 'ಗೌಪ್ಯತೆ',
    'cookies': 'ಕುಕೀಗಳು',
    'copyright': 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ',
    
    // PWA
    'install_app': 'ಅಪ್ಲಿಕೇಶನ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    'install_prompt': 'ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    'notifications': 'ಅಧಿಸೂಚನೆಗಳು',
    'enable_notifications': 'ಅಧಿಸೂಚನೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ',
    'offline_mode': 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
    'offline_message': 'ನೀವು ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ',
    'app_updated': 'ಅಪ್ಲಿಕೇಶನ್ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ',
    'refresh': 'ರಿಫ್ರೆಶ್',
    
    // Language
    'language': 'ಭಾಷೆ',
    'select_language': 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  }
};

// Return translation for a given key and language
export const getTranslation = (key: string, lang: string = 'en'): string => {
  if (!translations[lang]) {
    return translations['en'][key] || key;
  }
  return translations[lang][key] || translations['en'][key] || key;
};
