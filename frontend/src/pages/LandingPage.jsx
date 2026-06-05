import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          SUAP
        </div>

        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#workflow">How It Works</a></li>
          <li><a href="#about">About</a></li>

          <li>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </li>

          <li>
            <Link to="/signup" className="register-btn">
              Register
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <h1>
            Smart University
            <span> Assistance Platform</span>
          </h1>

          <p>
            A centralized platform that enables students
            to submit complaints, track issue resolution,
            search university information and stay updated
            with official notices.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>

        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Student"
          />
        </div>

      </section>

      {/* Features */}
      <section id="features" className="features">

        <h2>Platform Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Complaint Management</h3>
            <p>
              Raise complaints directly to university departments.
            </p>
          </div>

          <div className="feature-card">
            <h3>Track Complaints</h3>
            <p>
              Monitor issue status in real-time.
            </p>
          </div>

          <div className="feature-card">
            <h3>Smart Search</h3>
            <p>
              Search notices, procedures, and documents instantly.
            </p>
          </div>

          <div className="feature-card">
            <h3>Notice Board</h3>
            <p>
              Receive important university announcements.
            </p>
          </div>

          <div className="feature-card">
            <h3>Department Directory</h3>
            <p>
              Find department contacts and office details.
            </p>
          </div>

          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>
              OTP email verification and JWT-based login.
            </p>
          </div>

        </div>

      </section>

      {/* Workflow */}
      <section id="workflow" className="workflow">

        <h2>How It Works</h2>

        <div className="steps">

          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create your account using university email.</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Submit Issue</h3>
            <p>Raise complaints to relevant departments.</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Track Progress</h3>
            <p>Get updates and monitor complaint status.</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Resolution</h3>
            <p>Receive transparent and timely responses.</p>
          </div>

        </div>

      </section>

      {/* Statistics */}
      <section className="stats">

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Accessibility</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>Digital Tracking</p>
        </div>

        <div className="stat-card">
          <h2>Real-Time</h2>
          <p>Notifications</p>
        </div>

        <div className="stat-card">
          <h2>Secure</h2>
          <p>Authentication</p>
        </div>

      </section>

      {/* About */}
      <section id="about" className="about">

        <h2>About SUAP</h2>

        <p>
          Smart University Assistance Platform (SUAP) is designed
          to simplify communication between students and university
          departments by providing a centralized digital solution
          for complaints, notices, search, and support services.
        </p>

      </section>

      {/* Footer */}
      <footer className="footer">

        <h3>Smart University Assistance Platform</h3>

        <p>
          Empowering students through transparency,
          accessibility and digital transformation.
        </p>

      </footer>

    </div>
  );
};

export default LandingPage;