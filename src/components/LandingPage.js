import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Button from './Button';
import { useNavigate, useLocation } from 'react-router-dom';
import productsPricing from '../data/productsPricing';
import './LandingPage.css';
import Banner from './Banner';
import companyLogo from '../images/siemens_logo.svg'; // Import the company logo
import promo from '../images/solid-edge-promo.jpg';
import {
    DEFAULT_LOCALE,
    DEFAULT_CURRENCY,
    normalizeLocale,
    findCurrencySymbol,
    getStoreTemplateAttributes,
    getEffectiveLocale
} from '../utils/localeUtils';

const LandingPage = ({ country, locale: propLocale, spi: propSpi }) => {
    const navigate = useNavigate();
    const location = useLocation();
    //const [selectedCountry, setSelectedCountry] = useState(country || 'US');
    const [locale, setLocale] = useState(DEFAULT_LOCALE);
    const [currencySymbol, setCurrencySymbol] = useState(DEFAULT_CURRENCY);
    const [products, setProducts] = useState([]);

    // Memoized store template attributes to avoid repeated DOM queries
    const storeTemplateAttributes = useMemo(() => getStoreTemplateAttributes(), []);

    // Initialize locale and currency on component mount
    useEffect(() => {
        // Priority: Props from StoreTemplate > Query parameters > HTML attributes > browser language > default
        let effectiveLocale;

        if (propLocale) {
            effectiveLocale = propLocale;
        } else {
            effectiveLocale = getEffectiveLocale();
        }

        //console.log('Props locale:', propLocale);
        //console.log('HTML attribute locale:', storeTemplateAttributes.locale);
        //console.log('Query parameter locale:', new URLSearchParams(window.location.search).get('locale'));
        //console.log('Using effective locale:', effectiveLocale);

        setLocale(effectiveLocale);
        setCurrencySymbol(findCurrencySymbol(effectiveLocale));
        setProducts(productsPricing[effectiveLocale] || productsPricing[DEFAULT_LOCALE] || []);

        //console.log('Currency symbol for', effectiveLocale + ':', findCurrencySymbol(effectiveLocale));
    }, [propLocale, storeTemplateAttributes.locale, location.search]);

    // Initialize SPI from store template
    useEffect(() => {
        const effectiveSpi = propSpi || storeTemplateAttributes.spi;
        if (effectiveSpi) {
            sessionStorage.setItem('spi', effectiveSpi);
        }
    }, [propSpi, storeTemplateAttributes.spi]);

    // Track product clicks and navigate to cart
    const handleViewDetails = useCallback((sku) => {
        const clickCount = parseInt(sessionStorage.getItem(sku) || '0', 10);
        sessionStorage.setItem(sku, (clickCount + 1).toString());

        const spi = sessionStorage.getItem('spi');
        navigate(`/cart/${sku}?spi=${spi}&locale=${locale}`);
    }, [navigate, locale]);

    // Handle redeem action
    const handleRedeemNow = useCallback(() => {
        const spi = sessionStorage.getItem('spi');
        const redeemUrl = `https://www.plm.automation.siemens.com/offer/one?spi=${spi}`;
        window.location.href = redeemUrl;
    }, []);

    return (
        <div className="landing-page">
            <Banner
                onRedeem={handleRedeemNow}
                promoImage={promo}
                currencySymbol={currencySymbol}
                price={1}
            />
            <h1 className="title">Our Solutions</h1>
            <div className="grid">
                {products.map(product => (
                    <div key={product.sku} className="card">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="image"
                        />
                        <h5>{product.name}</h5>

                        <p className="price">
                            <strong>
                                {currencySymbol} {product.priceMonthlyhome} / month
                            </strong>
                        </p>
                        <Button label="View Detail" onClick={() => handleViewDetails(product.sku)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
