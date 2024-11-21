import React from "react";
import "./LandingPage.css";
import { Home, Building, MapPin, Phone, Search } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header Section
      <header className="header">
        <div className="logo">
          <Home size={24} />
          <span>RealEstatePro</span>
        </div>
        <nav className="nav">
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Dream Property</h1>
        <p>
          Whether you're looking to buy, sell, or rent, we've got you covered
          with the best deals and properties.
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Search for properties..." />
          <button>
            <Search size={18} />
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service">
            <Building size={40} />
            <h3>Rentals</h3>
            <p>Find apartments, houses, and offices for rent.</p>
          </div>
          <div className="service">
            <Home size={40} />
            <h3>Buy & Sell</h3>
            <p>List your property or browse our sales catalog.</p>
          </div>
          <div className="service">
            <MapPin size={40} />
            <h3>Location Expertise</h3>
            <p>Get the best advice on top locations to invest in.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p>Have questions? Get in touch with our team today!</p>
        <div className="contact-info">
          <div className="contact-item">
            <Phone size={24} />
            <p>+1 800 123 456</p>
          </div>
          <div className="contact-item">
            <MapPin size={24} />
            <p>123 Real Estate Ave, Metropolis</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 RealEstatePro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
