import React from "react";
import "../css/LandingPage.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="App">
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>Professional Psychology Services</h1>
          <p>Find peace of mind with our expert guidance and support</p>
          <Link to="#contact" className="cta-button">
            Book a Session
          </Link>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Our Services</h2>
        <div className="cards-container">
          <div className="card">
            <h3>Counseling</h3>
            <p>
              Personalized counseling sessions to help you navigate life's
              challenges.
            </p>
          </div>
          <div className="card">
            <h3>Therapy</h3>
            <p>
              Professional therapy sessions for individuals, couples, and
              families.
            </p>
          </div>
          <div className="card">
            <h3>Mindfulness</h3>
            <p>
              Mindfulness training and meditation techniques for stress
              reduction.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
