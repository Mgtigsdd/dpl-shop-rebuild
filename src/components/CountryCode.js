import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getEffectiveLocale, getCountryFromLocale } from '../utils/localeUtils';

const CountryCode = ({ onCountryChange }) => {
    const location = useLocation();
    
    useEffect(() => {
        const effectiveLocale = getEffectiveLocale();
        const detectedCountry = getCountryFromLocale(effectiveLocale);
        onCountryChange(detectedCountry);
    }, [onCountryChange, location.search]);

    return null; // Does not render anything
};

export default CountryCode;
