// Constants
export const CURRENCY_LOCALES = {
    '$': ['en_US'],
    '£': ['en_GB'],
    '€': ['en_EU', 'es_ES', 'de_DE'],
    '₹': ['en_IN'],
    'AU$': ['en_AU', 'en_NZ'],
};

//export const DEFAULT_LOCALE = 'en_US';
//export const DEFAULT_CURRENCY = '$';
export const DEFAULT_LOCALE = 'en_IN';
export const DEFAULT_CURRENCY = '₹';

// Utility functions
export const normalizeLocale = (locale) => {
    if (!locale || !locale.includes('-')) return locale;
    const [language, region] = locale.split('-');
    return `${language.toLowerCase()}_${region.toUpperCase()}`;
};

export const findCurrencySymbol = (locale) => {
    return Object.keys(CURRENCY_LOCALES).find(symbol =>
        CURRENCY_LOCALES[symbol].includes(locale)
    ) || DEFAULT_CURRENCY;
};

export const getStoreTemplateAttributes = () => {
    const element = document.querySelector('store-template');
    return {
        locale: element?.getAttribute('locale'),
        spi: element?.getAttribute('spi'),
        country: element?.getAttribute('country'),
    };
};

// New function to get the final locale with proper priority
export const getEffectiveLocale = () => {
    const attributes = getStoreTemplateAttributes();
    
    // Priority: Query parameters > HTML attribute > browser language > default
    const queryParams = new URLSearchParams(window.location.search);
    const queryLocale = queryParams.get('locale');
    
    if (queryLocale && isValidLocale(queryLocale)) {
        return queryLocale;
    }
    
    if (attributes.locale) {
        return attributes.locale;
    }
    
    const browserLocale = normalizeLocale(navigator.language);
    //return browserLocale && isValidLocale(browserLocale) ? browserLocale : DEFAULT_LOCALE;
    // Convert US users to India pricing (if needed)
    const mappedLocale = browserLocale === 'en_US' ? 'en_IN' : browserLocale;
    return isValidLocale(mappedLocale) ? mappedLocale : DEFAULT_LOCALE;
};

// Helper to check if locale is valid/supported
export const isValidLocale = (locale) => {
    return Object.keys(CURRENCY_LOCALES).some(currency =>
        CURRENCY_LOCALES[currency].includes(locale)
    );
};

// Format a number as currency per locale (e.g. en_IN → 1,02,559.88)
export const formatPrice = (amount, locale = DEFAULT_LOCALE) => {
    const bcp47 = locale.replace('_', '-'); // en_IN → en-IN
    return new Intl.NumberFormat(bcp47, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Extract country code from locale
export const getCountryFromLocale = (locale) => {
    const localeToCountry = {
        'en_US': 'US',
        'en_GB': 'GB', 
        'en_EU': 'DE', // Default EU to Germany
        'es_ES': 'ES',
        'de_DE': 'DE',
        'en_IN': 'IN',
        'en_AU': 'AU', 
        'en_NZ': 'NZ'
    };
    
    //return localeToCountry[locale] || 'US'; // Default to US
    return localeToCountry[locale] || 'IN';
};
