import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaRocket, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="py-5">
      <Container>
        <Row className="align-items-center mb-5 py-5">
          <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
            <h1 className="display-3 fw-bold mb-3" style={{ lineHeight: 1.1 }}>
              Manage Tasks with <span className="text-gradient">Intelligence</span>
            </h1>
            <p className="lead text-muted mb-4 fs-4">
              The smart todo management system designed for high-performance teams and individuals. Stay organized, focused, and productive.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link to="/register">
                <button className="btn-premium btn-primary-premium py-3 px-5 fs-5 w-100">
                  Start for Free
                </button>
              </Link>
              <Link to="/login">
                <button className="btn-premium py-3 px-5 fs-5 w-100" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
                  View Demo
                </button>
              </Link>
            </div>
          </Col>
          <Col lg={6}>
            <div className="premium-card p-2 glass-panel" style={{ transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)' }}>
              <div className="bg-primary bg-opacity-10 rounded-4 p-5 text-center">
                 <FaRocket size={120} className="text-primary mb-4" />
                 <h2 className="fw-bold">SmartTask v2.0</h2>
                 <p className="text-muted">Experience the future of productivity</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mb-5 pb-5">
          {[
            { icon: <FaCheckCircle />, title: 'Smart Filtering', desc: 'Find what you need in seconds with advanced search and multi-filters.' },
            { icon: <FaShieldAlt />, title: 'Secure Auth', desc: 'Your data is protected with industry-standard JWT and bcrypt encryption.' },
            { icon: <FaMobileAlt />, title: 'Responsive', desc: 'Seamlessly manage your tasks on desktop, tablet, or mobile devices.' },
            { icon: <FaRocket />, title: 'Fast & Lightweight', desc: 'Built with MERN stack for maximum speed and smooth transitions.' }
          ].map((feature, idx) => (
            <Col md={3} key={idx}>
              <div className="premium-card h-100 text-center py-4">
                <div className="text-primary fs-1 mb-3">{feature.icon}</div>
                <h5 className="fw-bold mb-2">{feature.title}</h5>
                <p className="text-muted small mb-0">{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>

        <div className="premium-card p-5 text-center glass-panel">
          <h2 className="fw-bold mb-3">Ready to boost your productivity?</h2>
          <p className="text-muted mb-4">Join thousands of users who are already managing their tasks smarter.</p>
          <Link to="/register">
            <button className="btn-premium btn-primary-premium py-3 px-5">
              Create Your Account Now
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
