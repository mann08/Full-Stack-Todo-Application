import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaMoon, FaSun, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CustomNavbar = ({ theme, setTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar expand="lg" className="glass-panel py-3 sticky-top mb-4" style={{ borderRadius: '0 0 24px 24px', borderTop: 'none' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            S
          </div>
          <span className="text-gradient">SmartTask</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <button 
              className="btn-premium p-2" 
              onClick={toggleTheme}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', color: 'var(--text-main)' }}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>

            {user ? (
              <>
                <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
                  <FaUserCircle className="text-primary" />
                  <span className="fw-600 small">{user.name}</span>
                </div>
                <button 
                  className="btn-premium py-2" 
                  onClick={handleLogout}
                  style={{ background: 'var(--danger)', color: 'white' }}
                >
                  <FaSignOutAlt />
                  <span className="d-lg-inline d-none">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="fw-600">Login</Nav.Link>
                <Link to="/register">
                  <button className="btn-premium btn-primary-premium py-2">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
