import React from "react";
import "./About.css";
import { Users, Map, Briefcase } from "lucide-react";

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>
          Discover who we are and what makes us the best choice for your real
          estate needs.
        </p>
      </header>

      <section className="about-content">
        <div className="about-section">
          <Users size={40} />
          <h3>Our Team</h3>
          <p>
            Our experienced professionals are here to guide you every step of
            the way.
          </p>
        </div>
        <div className="about-section">
          <Map size={40} />
          <h3>Our Locations</h3>
          <p>
            We operate in multiple regions, connecting you to the best
            properties around.
          </p>
        </div>
        <div className="about-section">
          <Briefcase size={40} />
          <h3>Our Expertise</h3>
          <p>
            Decades of combined experience make us the real estate agency you
            can trust.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
