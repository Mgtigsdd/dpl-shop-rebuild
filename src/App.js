import './App.css';
import './index.css';
import './components/CartPlugin.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import CartPlugin from './components/CartPlugin';
import Header from './components/Header';
import Footer from './components/Footer';

const App = ({ country, locale, spi }) => {

    return (
        <Router>
            <Header />   {/* ✅ GLOBAL HEADER */}

            <Routes>
                <Route path="/" element={<LandingPage country={country} locale={locale} spi={spi} />} />
                <Route path="/cart/:sku" element={<CartPlugin country={country} locale={locale} spi={spi} />} />
            </Routes>

            <Footer />   {/* ✅ GLOBAL FOOTER */}
        </Router>
    );
};

export default App;