import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email: formData.email, password: formData.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="premium-card p-4 p-md-5 glass-panel" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white p-3 rounded-4 d-inline-flex mb-3 shadow-lg">
            <FaLock size={24} />
          </div>
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Enter your credentials to access your tasks</p>
        </div>

        {error && <div className="alert alert-danger border-0 small py-2 mb-4">{error}</div>}

        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-4">
            <Form.Label className="small fw-bold text-uppercase text-muted">Password</Form.Label>
            <div className="position-relative">
              <span className="position-absolute translate-middle-y" style={{ top: '50%', left: '15px', color: 'var(--text-muted)' }}>
                <FaLock />
              </span>
              <Form.Control
                type="password"
                className="input-premium ps-5"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </Form.Group>

          <button 
            type="submit" 
            className="btn-premium btn-primary-premium w-100 py-3 mb-3"
            disabled={loading}
          >
            {loading ? 'Logging in...' : <><FaSignInAlt /> Login</>}
          </button>
        </Form>

        <p className="text-center text-muted small mb-0">
          Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create one</Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
