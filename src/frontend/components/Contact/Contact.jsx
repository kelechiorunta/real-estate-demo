import React from "react";
import "./Contact.css";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out to us for any inquiries.</p>
      </header>

      <section className="contact-info">
        <div className="contact-item">
          <Phone size={40} />
          <h3>Phone</h3>
          <p>+1 800 123 456</p>
        </div>
        <div className="contact-item">
          <Mail size={40} />
          <h3>Email</h3>
          <p>info@realestatepro.com</p>
        </div>
        <div className="contact-item">
          <MapPin size={40} />
          <h3>Address</h3>
          <p>123 Real Estate Ave, Metropolis</p>
        </div>
      </section>

      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
