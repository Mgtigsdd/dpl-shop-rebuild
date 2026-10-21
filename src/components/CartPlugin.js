import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CountryCode from './CountryCode';
import Button from './Button';
import productsPricing from '../data/productsPricing'; // Import the products data
import './CartPlugin.css';
import { formatPrice } from '../utils/localeUtils';

import cartImage from '../images/shopping-cart.svg';


const CartPlugin = ({ country: propCountry, locale: propLocale, spi: propSpi }) => {
    const { sku } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    
    // Priority: Props > Query params > default
    const locale = propLocale || queryParams.get('locale') || 'en_US';
    
    const [product, setProduct] = useState([]);
    const products = productsPricing[locale] || []; // Get products for the detected locale
    
    //const product = products.find(p => p.sku === sku);


    const [qty, setQty] = useState(product?.qty || 1);
    const [coupon, setCoupon] = useState('');
    const [country, setCountry] = useState(propCountry || '');
    const [subscriptionTerm, setSubscriptionTerm] = useState('Yearly'); // Default to Yearly
    const [price, setPrice] = useState(product?.priceYearly); // Default to Yearly price
    const [cart, setCart] = useState([]);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [globalTerm, setGlobalTerm] = useState(null); // Global state for selected term
    const [spi, setSpi] = useState(propSpi || ''); // State to store the SPI value

    useEffect(() => {
        // Find the product based on the SKU using effective locale
        const effectiveLocale = propLocale || queryParams.get('locale') || 'en_US';
        const products = productsPricing[effectiveLocale] || []; // Get products for the detected locale
        const foundProduct = products.find((p) => p.sku === sku); // Find the product by SKU
        setProduct(foundProduct); // Set the product in state
    }, [sku, propLocale, queryParams]);

    useEffect(() => {
        // Extract the SPI value - Priority: Props > URL params > sessionStorage  
        const urlParams = new URLSearchParams(window.location.search);
        const effectiveSpi = propSpi || urlParams.get('spi') || sessionStorage.getItem('spi');
        if (effectiveSpi) {
            setSpi(effectiveSpi);
            sessionStorage.setItem('spi', effectiveSpi); // Store SPI in sessionStorage
        }
    }, [propSpi]);

    useEffect(() => {
        switch (subscriptionTerm) {
            case 'Monthly':
                setPrice(product?.priceMonthly);
                break;
            case 'Yearly':
                setPrice(product?.priceYearly);
                break;
            case '3 Years':
                setPrice(product?.price3Years);
                break;
            default:
                setPrice(product?.priceYearly);
        }
    }, [subscriptionTerm, product]);

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);

        // If a global term is already set, enforce it
        if (storedCart.length > 0 && !globalTerm) {
            setGlobalTerm(storedCart[0].subscriptionTerm);
        }
    }, []);

    const handleAddToCart = () => {
        // If no global term is set, set it to the current subscription term
        if (!globalTerm) {
            setGlobalTerm(subscriptionTerm);
        }

        const newCart = [...cart, { sku, qty, subscriptionTerm, price }];
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    const handleViewCart = () => {
        setShowCouponModal(true);
    };

    const handleApplyCoupon = () => {
        setShowCouponModal(false);

        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        let url = `https://www.plm.automation.siemens.com/offer/configurable_cart?country=${country}`;
        storedCart.forEach((item) => {
            let term = 'yearly'; // Default term
            let length = 1; // Default length

            // Determine the term and length based on the subscription term
            switch (item.subscriptionTerm) {
                case 'Monthly':
                    term = 'monthly';
                    break;
                case 'Yearly':
                    term = 'yearly';
                    length = 1;
                    break;
                case '3 Years':
                    term = 'yearly';
                    length = 3;
                    break;
                default:
                    term = 'yearly';
                    length = 1;
            }

            url += `&sku=${item.sku}&qty=${item.qty}&term=${term}&length=${length}`;
        });

        if (coupon.trim() !== '') {
            url += `&coupon=${encodeURIComponent(coupon.trim())}`;
        }

        // Append the SPI parameter to the URL
        if (spi) {
            url += `&spi=${spi}`;
        }

        url += '&create_cart=Create+Cart';

        window.location.href = url;
    };

    const handleTermSelection = (term) => {
        // Prevent changing the term if a global term is already set
        if (!globalTerm) {
            setSubscriptionTerm(term);
        }
    };

    const isAddToCartDisabled = () => {
        // Disable "Add to Cart" if the global term is not available for the current product
        if (globalTerm) {
            const availableTerms = [
                { term: 'Monthly', price: product?.priceMonthly },
                { term: 'Yearly', price: product?.priceYearly },
                { term: '3 Years', price: product?.price3Years }
            ].filter(option => option.price > 0).map(option => option.term);

            return !availableTerms.includes(globalTerm);
        }
        return false;
    };

    const handleClearCart = () => {
        sessionStorage.removeItem('cart'); // Clear cart data from sessionStorage
        setCart([]); // Reset cart state
        setGlobalTerm(null); // Reset the global term
    };

    const getPriceForTerm = (product, term) => {
        switch (term) {
            case 'Monthly': return product.priceMonthly;
            case 'Yearly': return product.priceYearly;
            case '3 Years': return product.price3Years;
            default: return product.priceYearly;
        }
    };

    return (
        <div>            
            <div className="cart-plugin-container">
                 {/* Clear Cart Image */}
            {cart.length > 0 && ( // Only show the image and message if the cart has items
                    <div className="clear-cart-container" >
                        <img
                            src={cartImage} // Use the imported cart image
                            alt="Clear Cart"
                            className="clear-cart-image"
                            onClick={handleClearCart}
                        />
                        <p className="clear-cart-text">Clear the cart</p>
                    </div>
                )}
                <CountryCode onCountryChange={setCountry} />
                {product && (
    <div className="product-info">
        <img
            className="product-image"
            src={product.image}
            alt={product.name || 'Product'}
        />
        <h2 className="product-name">{product.name}</h2>
        {product.description && (
            <p className="product-description">{product.description}</p>
        )}
    </div>
)}
                
               
                <form className="cart-form">
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={qty}
                            min="1"
                            onChange={(e) => setQty(parseInt(e.target.value))}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <p>{formatPrice(getPriceForTerm(product, globalTerm || subscriptionTerm), locale)}</p>
                    </div>
                    <div className="form-group">
                        <label>Subscription Term:</label>
                        <div className="subscription-buttons">
                            {[
                                { term: 'Monthly', price: product?.priceMonthly },
                                { term: 'Yearly', price: product?.priceYearly },
                                { term: '3 Years', price: product?.price3Years }
                            ]
                            .filter(option => option.price > 0) 
                            .filter(option => !globalTerm || option.term === globalTerm) 
                            .map(option => (
                            <button
                                key={option.term}
                                type="button"
                                className={`subscription-button ${subscriptionTerm === option.term ? 'active' : ''}`}
                                onClick={() => handleTermSelection(option.term)}
                                >
                                {option.term}
                            </button>
                        ))}
                        </div>
                        
                        {globalTerm && ( // Show the message if a global term is set
                        <p className="global-term-message">
                            You have selected the first product with the "{globalTerm}" term, so only this term is available for other products.
                        </p>
                    )}
                </div>
                    <Button
                        label="Add to Cart"
                        onClick={handleAddToCart}
                        disabled={isAddToCartDisabled()} // Disable if global term is not available
                    />
                    {cart.length > 0 && (
                        <div className="cart-actions">
                            <div className="cart-buttons">
                                <Button label="View Cart" onClick={handleViewCart} />
                                <Button label="Explore" onClick={() => navigate('/')} />
                            </div>
                            <p className="cart-count">You have {cart.length} item(s) in your cart.</p>
                        </div>
                    )}
                </form>
            </div>
            
            {/* Coupon Code Modal */}
            {showCouponModal && (
    <div className="modal-overlay">
        <div className="modal-content" style={{ position: 'relative' }}>
            <button
                className="modal-close"
                onClick={() => setShowCouponModal(false)}
                aria-label="Close"
            >
                &times;
            </button>
            <h2>Enter Coupon Code</h2>
            <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="form-input"
            />
            <div className="modal-actions">
                <button className="apply-button" onClick={handleApplyCoupon}>Apply</button>
                <button className="skip-button" onClick={handleApplyCoupon}>Skip</button>
            </div>
        </div>
    </div>
)}
        </div>
        
    );
};

export default CartPlugin;
