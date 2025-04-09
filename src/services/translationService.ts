
// Available languages in the application
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
];

// Translations for each language
const translations: Record<string, Record<string, string>> = {
  // English translations
  en: {
    // Navigation
    home: 'Home',
    categories: 'Categories',
    post_ad: 'Post Ad',
    my_account: 'My Account',
    messages: 'Messages',
    favorites: 'Favorites',
    settings: 'Settings',
    language: 'Language',

    // Home page
    search_placeholder: 'Search for anything...',
    featured_listings: 'Featured Listings',
    new_arrivals: 'New Arrivals',
    popular_categories: 'Popular Categories',
    view_all: 'View All',
    
    // Categories
    electronics: 'Electronics',
    furniture: 'Furniture',
    clothing: 'Clothing',
    vehicles: 'Vehicles',
    real_estate: 'Real Estate',
    jobs: 'Jobs',
    services: 'Services',
    
    // Product card
    listed: 'Listed',
    view_details: 'View Details',
    add_to_favorites: 'Add to Favorites',
    contact_seller: 'Contact Seller',
    
    // Auth
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    logout: 'Logout',
    forgot_password: 'Forgot Password?',
    register: 'Register',
    
    // Filters
    price: 'Price',
    location: 'Location',
    condition: 'Condition',
    sort_by: 'Sort By',
    
    // PWA
    install_app: 'Install App',
    install_prompt: 'Install our app for a better experience',
    app_updated: 'App Updated',
    refresh: 'Refresh',
    offline_message: 'You are offline. Some features may be unavailable.',
    
    // Voice search
    voice_search: 'Voice Search',
    listening: 'Listening...',
    voice_not_supported: 'Voice search is not supported on this browser',
  },
  
  // Hindi translations
  hi: {
    // Navigation
    home: 'होम',
    categories: 'श्रेणियाँ',
    post_ad: 'विज्ञापन पोस्ट करें',
    my_account: 'मेरा खाता',
    messages: 'संदेश',
    favorites: 'पसंदीदा',
    settings: 'सेटिंग्स',
    language: 'भाषा',

    // Home page
    search_placeholder: 'कुछ भी खोजें...',
    featured_listings: 'विशेष लिस्टिंग',
    new_arrivals: 'नई आवक',
    popular_categories: 'लोकप्रिय श्रेणियाँ',
    view_all: 'सभी देखें',
    
    // Categories
    electronics: 'इलेक्ट्रॉनिक्स',
    furniture: 'फर्नीचर',
    clothing: 'कपड़े',
    vehicles: 'वाहन',
    real_estate: 'रियल एस्टेट',
    jobs: 'नौकरियां',
    services: 'सेवाएं',
    
    // Product card
    listed: 'सूचीबद्ध',
    view_details: 'विवरण देखें',
    add_to_favorites: 'पसंदीदा में जोड़ें',
    contact_seller: 'विक्रेता से संपर्क करें',
    
    // Auth
    sign_in: 'साइन इन करें',
    sign_up: 'साइन अप करें',
    logout: 'लॉगआउट',
    forgot_password: 'पासवर्ड भूल गए?',
    register: 'रजिस्टर करें',
    
    // Filters
    price: 'कीमत',
    location: 'स्थान',
    condition: 'हालत',
    sort_by: 'इसके अनुसार क्रमबद्ध करें',
    
    // PWA
    install_app: 'ऐप इंस्टॉल करें',
    install_prompt: 'बेहतर अनुभव के लिए हमारा ऐप इंस्टॉल करें',
    app_updated: 'ऐप अपडेट हुआ',
    refresh: 'रीफ्रेश करें',
    offline_message: 'आप ऑफलाइन हैं। कुछ सुविधाएँ अनुपलब्ध हो सकती हैं।',
    
    // Voice search
    voice_search: 'आवाज़ खोज',
    listening: 'सुन रहा है...',
    voice_not_supported: 'इस ब्राउज़र पर वॉइस सर्च समर्थित नहीं है',
  },
  
  // Tamil translations
  ta: {
    // Navigation
    home: 'முகப்பு',
    categories: 'வகைகள்',
    post_ad: 'விளம்பரம் இடு',
    my_account: 'என் கணக்கு',
    messages: 'செய்திகள்',
    favorites: 'பிடித்தவை',
    settings: 'அமைப்புகள்',
    language: 'மொழி',
    
    // Home page
    search_placeholder: 'எதையும் தேடு...',
    featured_listings: 'சிறப்பு பட்டியல்கள்',
    new_arrivals: 'புதிய வருகைகள்',
    popular_categories: 'பிரபலமான வகைகள்',
    view_all: 'அனைத்தையும் காட்டு',
    
    // Categories
    electronics: 'மின்னணு சாதனங்கள்',
    furniture: 'தளபாடங்கள்',
    clothing: 'ஆடைகள்',
    vehicles: 'வாகனங்கள்',
    real_estate: 'ரியல் எஸ்டேட்',
    jobs: 'வேலைகள்',
    services: 'சேவைகள்',
    
    // Product card
    listed: 'பட்டியலிடப்பட்டது',
    view_details: 'விவரங்களைக் காண',
    add_to_favorites: 'பிடித்தவைகளில் சேர்க்க',
    contact_seller: 'விற்பனையாளரைத் தொடர்பு கொள்ளவும்',
    
    // Auth
    sign_in: 'உள்நுழைக',
    sign_up: 'பதிவு செய்க',
    logout: 'வெளியேறு',
    forgot_password: 'கடவுச்சொல் மறந்துவிட்டதா?',
    register: 'பதிவு செய்க',
    
    // Filters
    price: 'விலை',
    location: 'இடம்',
    condition: 'நிலை',
    sort_by: 'வரிசைப்படுத்து',
    
    // PWA
    install_app: 'பயன்பாட்டை நிறுவு',
    install_prompt: 'சிறந்த அனுபவத்திற்கு எங்கள் பயன்பாட்டை நிறுவவும்',
    app_updated: 'பயன்பாடு புதுப்பிக்கப்பட்டது',
    refresh: 'புதுப்பி',
    offline_message: 'நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். சில அம்சங்கள் கிடைக்காமல் போகலாம்.',
    
    // Voice search
    voice_search: 'குரல் தேடல்',
    listening: 'கேட்கிறது...',
    voice_not_supported: 'இந்த உலாவியில் குரல் தேடல் ஆதரிக்கப்படவில்லை',
  },
  
  // Telugu translations
  te: {
    // Navigation
    home: 'హోమ్',
    categories: 'వర్గాలు',
    post_ad: 'ప్రకటన పోస్ట్ చేయండి',
    my_account: 'నా ఖాతా',
    messages: 'సందేశాలు',
    favorites: 'ఇష్టమైనవి',
    settings: 'సెట్టింగులు',
    language: 'భాష',
    
    // Home page
    search_placeholder: 'దేనినైనా శోధించండి...',
    featured_listings: 'ఫీచర్డ్ జాబితాలు',
    new_arrivals: 'కొత్త రాకలు',
    popular_categories: 'జనాదరణ పొందిన వర్గాలు',
    view_all: 'అన్నీ చూడండి',
    
    // Categories
    electronics: 'ఎలక్ట్రానిక్స్',
    furniture: 'ఫర్నిచర్',
    clothing: 'దుస్తులు',
    vehicles: 'వాహనాలు',
    real_estate: 'రియల్ ఎస్టేట్',
    jobs: 'ఉద్యోగాలు',
    services: 'సేవలు',
    
    // Product card
    listed: 'జాబితా చేయబడింది',
    view_details: 'వివరాలను వీక్షించండి',
    add_to_favorites: 'ఇష్టమైనవాటికి జోడించండి',
    contact_seller: 'విక్రేతను సంప్రదించండి',
    
    // Auth
    sign_in: 'సైన్ ఇన్ చేయండి',
    sign_up: 'సైన్ అప్ చేయండి',
    logout: 'లాగ్ అవుట్',
    forgot_password: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    register: 'నమోదు చేయండి',
    
    // Filters
    price: 'ధర',
    location: 'స్థానం',
    condition: 'స్థితి',
    sort_by: 'క్రమంలో పెట్టండి',
    
    // PWA
    install_app: 'యాప్‌ని ఇన్‌స్టాల్ చేయండి',
    install_prompt: 'మెరుగైన అనుభవం కోసం మా యాప్‌ని ఇన్‌స్టాల్ చేయండి',
    app_updated: 'యాప్ నవీకరించబడింది',
    refresh: 'రిఫ్రెష్ చేయండి',
    offline_message: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కొన్ని ఫీచర్‌లు అందుబాటులో ఉండకపోవచ్చు.',
    
    // Voice search
    voice_search: 'వాయిస్ శోధన',
    listening: 'వింటోంది...',
    voice_not_supported: 'ఈ బ్రౌజర్‌లో వాయిస్ శోధన మద్దతు లేదు',
  },
  
  // Bengali translations
  bn: {
    // Navigation
    home: 'হোম',
    categories: 'বিভাগসমূহ',
    post_ad: 'বিজ্ঞাপন পোস্ট করুন',
    my_account: 'আমার অ্যাকাউন্ট',
    messages: 'বার্তা',
    favorites: 'পছন্দ',
    settings: 'সেটিংস',
    language: 'ভাষা',
    
    // Home page
    search_placeholder: 'কিছু খুঁজুন...',
    featured_listings: 'বৈশিষ্ট্যযুক্ত তালিকা',
    new_arrivals: 'নতুন আগমন',
    popular_categories: 'জনপ্রিয় বিভাগ',
    view_all: 'সব দেখুন',
    
    // Categories
    electronics: 'ইলেকট্রনিক্স',
    furniture: 'আসবাবপত্র',
    clothing: 'পোশাক',
    vehicles: 'যানবাহন',
    real_estate: 'রিয়েল এস্টেট',
    jobs: 'চাকরি',
    services: 'সেবা',
    
    // Product card
    listed: 'তালিকাভুক্ত',
    view_details: 'বিস্তারিত দেখুন',
    add_to_favorites: 'পছন্দে যোগ করুন',
    contact_seller: 'বিক্রেতার সাথে যোগাযোগ করুন',
    
    // Auth
    sign_in: 'সাইন ইন করুন',
    sign_up: 'সাইন আপ করুন',
    logout: 'লগআউট',
    forgot_password: 'পাসওয়ার্ড ভুলে গেছেন?',
    register: 'নিবন্ধন করুন',
    
    // Filters
    price: 'মূল্য',
    location: 'অবস্থান',
    condition: 'অবস্থা',
    sort_by: 'সাজান',
    
    // PWA
    install_app: 'অ্যাপ ইনস্টল করুন',
    install_prompt: 'আরও ভালো অভিজ্ঞতার জন্য আমাদের অ্যাপ ইনস্টল করুন',
    app_updated: 'অ্যাপ আপডেট হয়েছে',
    refresh: 'রিফ্রেশ করুন',
    offline_message: 'আপনি অফলাইনে আছেন। কিছু বৈশিষ্ট্য অনুপলব্ধ হতে পারে।',
    
    // Voice search
    voice_search: 'ভয়েস সার্চ',
    listening: 'শুনছে...',
    voice_not_supported: 'এই ব্রাউজারে ভয়েস সার্চ সমর্থিত নয়',
  },
  
  // Kannada translations
  kn: {
    // Navigation
    home: 'ಮುಖಪುಟ',
    categories: 'ವಿಭಾಗಗಳು',
    post_ad: 'ಜಾಹೀರಾತು ಪೋಸ್ಟ್ ಮಾಡಿ',
    my_account: 'ನನ್ನ ಖಾತೆ',
    messages: 'ಸಂದೇಶಗಳು',
    favorites: 'ಮೆಚ್ಚಿನವುಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    language: 'ಭಾಷೆ',
    
    // Home page
    search_placeholder: 'ಏನನ್ನಾದರೂ ಹುಡುಕಿ...',
    featured_listings: 'ವೈಶಿಷ್ಟ್ಯಪೂರ್ಣ ಪಟ್ಟಿಗಳು',
    new_arrivals: 'ಹೊಸ ಆಗಮನಗಳು',
    popular_categories: 'ಜನಪ್ರಿಯ ವಿಭಾಗಗಳು',
    view_all: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
    
    // Categories
    electronics: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್',
    furniture: 'ಫರ್ನಿಚರ್',
    clothing: 'ಉಡುಪು',
    vehicles: 'ವಾಹನಗಳು',
    real_estate: 'ರಿಯಲ್ ಎಸ್ಟೇಟ್',
    jobs: 'ಉದ್ಯೋಗಗಳು',
    services: 'ಸೇವೆಗಳು',
    
    // Product card
    listed: 'ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ',
    view_details: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    add_to_favorites: 'ಮೆಚ್ಚಿನವುಗಳಿಗೆ ಸೇರಿಸಿ',
    contact_seller: 'ಮಾರಾಟಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ',
    
    // Auth
    sign_in: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
    sign_up: 'ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    forgot_password: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
    register: 'ನೋಂದಣಿ ಮಾಡಿ',
    
    // Filters
    price: 'ಬೆಲೆ',
    location: 'ಸ್ಥಳ',
    condition: 'ಸ್ಥಿತಿ',
    sort_by: 'ಇದರ ಮೂಲಕ ವಿಂಗಡಿಸಿ',
    
    // PWA
    install_app: 'ಅಪ್ಲಿಕೇಶನ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    install_prompt: 'ಉತ್ತಮ ಅನುಭವಕ್ಕಾಗಿ ನಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    app_updated: 'ಅಪ್ಲಿಕೇಶನ್ ಅಪ್ಡೇಟ್ ಆಗಿದೆ',
    refresh: 'ರಿಫ್ರೆಶ್ ಮಾಡಿ',
    offline_message: 'ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಕೆಲವು ವೈಶಿಷ್ಟ್ಯಗಳು ಲಭ್ಯವಿಲ್ಲದಿರಬಹುದು.',
    
    // Voice search
    voice_search: 'ಧ್ವನಿ ಹುಡುಕಾಟ',
    listening: 'ಕೇಳುತ್ತಿದೆ...',
    voice_not_supported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಹುಡುಕಾಟವು ಬೆಂಬಲಿತವಾಗಿಲ್ಲ',
  }
};

// Function to get a translation by key and language
export function getTranslation(key: string, language: string): string {
  // Default to English if the requested language isn't available
  const lang = translations[language] ? language : 'en';
  
  // Return the translation or the key itself if not found
  return translations[lang][key] || key;
}
