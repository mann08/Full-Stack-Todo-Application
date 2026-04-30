import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      await register({ name: formData.name, email: formData.email, password: formData.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '80vh' }}>
      <div className="premium-card p-4 p-md-5 glass-panel" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white p-3 rounded-4 d-inline-flex mb-3 shadow-lg">
            <FaUserPlus size={24} />
          </div>
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted">Join SmartTask and start organizing today</p>
        </div>

        {error && <div className="alert alert-danger border-0 small py-2 mb-4">{error}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-uppercase text-muted">Full Name</Form.Label>
            <div className="position-relative">
              <span className="position-absolute translate-middle-y" style={{ top: '50%', left: '15px', color: 'var(--text-muted)' }}>
                <FaUser />
              </span>
              <Form.Control
                type="text"
                className="input-premium ps-5"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-uppercase text-muted">Email Address</Form.Label>
            <div className="position-relative">
              <span className="position-absolute translate-middle-y" style={{ top: '50%', left: '15px', color: 'var(--text-muted)' }}>
                <FaEnvelope />
              </span>
              <Form.Control
                type="email"
                className="input-premium ps-5"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </Form.Group>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <Form.Label className="small fw-bold text-uppercase text-muted">Password</Form.Label>
              <Form.Control
                type="password"
                className="input-premium"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <Form.Label className="small fw-bold text-uppercase text-muted">Confirm</Form.Label>
              <Form.Control
                type="password"
                className="input-premium"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-premium btn-primary-premium w-100 py-3 mb-3"
            disabled={loading}
          >
            {loading ? 'Creating account...' : <><FaUserPlus /> Create Account</>}
          </button>
        </Form>

        <p className="text-center text-muted small mb-0">
          Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;
