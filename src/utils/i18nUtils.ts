
// Format a number according to the current locale
export const formatNumber = (num: number, locale: string): string => {
  return new Intl.NumberFormat(localeMap[locale] || 'en-US').format(num);
};

// Format a date according to the current locale
export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(localeMap[locale] || 'en-US').format(date);
};

// Format a currency according to the current locale
export const formatCurrency = (amount: number, currency: string, locale: string): string => {
  return new Intl.NumberFormat(localeMap[locale] || 'en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Map our app locale codes to BCP 47 language tags
const localeMap: Record<string, string> = {
  'en': 'en-US',
  'hi': 'hi-IN',
  'ta': 'ta-IN',
  'te': 'te-IN',
  'bn': 'bn-IN',
  'kn': 'kn-IN'
};

// Get text direction (RTL or LTR) for a given locale
export const getTextDirection = (locale: string): 'rtl' | 'ltr' => {
  const rtlLocales = ['ar', 'he', 'ur', 'fa'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};

// Get primary language from locale code
export const getPrimaryLanguage = (locale: string): string => {
  return locale.split('-')[0];
};
