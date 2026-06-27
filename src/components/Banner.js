import React from 'react';
import './Banner.css'; // Import the CSS file for styling

const Banner = ({ onRedeem, promoImage, currencySymbol, price }) => {
    return (
        <div className="banner">
            <img 
                src={promoImage} // Replace with the actual image path
                alt="Banner"
                className="banner-image"
            />
            <div className="banner-content">
                <h2 className="banner-title">Your Partner in Digital Manufacturing</h2>
                <h3 className="banner-subtitle">Streamline processes, reduce costs, and improve product quality.</h3>
                <p className="banner-text">
                    Get the right solution with expert support—fast and reliable.
                </p>

            </div>
            {/* <button className="banner-button" onClick={onRedeem}>
                    Redeem Now
            </button> */}
            <a href="https://wa.me/919350633147?text=Hello%20I%20want%20a%20quote" target="_blank" rel="noopener noreferrer">
                    <button className="banner-button">
                    Contact Now
                    </button>
            </a>
        </div>
    );
};

export default Banner;