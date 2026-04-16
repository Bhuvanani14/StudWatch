import { useState } from 'react';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import './Auth.css';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: 'fan@india.sports',
    password: 'password123'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submit Triggered', { isLogin, formData });
    const userName = isLogin ? 'Manish' : formData.name || 'New Fan';
    onLogin({ name: userName, email: formData.email });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container fade-in">
      <div className="brand-header text-center">
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
          Stadium Sync
        </h1>
        <p className="text-muted" style={{ color: 'var(--text-muted)' }}>
          Your Ultimate Game Day Experience in India
        </p>
      </div>

      <div className="glass-panel auth-card">
        <h2 style={{ marginBottom: '24px' }}>
          {isLogin ? 'Welcome Back!' : 'Join the Crowd'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                required 
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              required
              defaultValue={isLogin ? 'fan@india.sports' : ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              required
              defaultValue={isLogin ? 'password123' : ''}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn-primary login-btn">
            {isLogin ? 'Enter Stadium' : 'Create Account'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer text-center">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <span 
              className="text-primary" 
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
      
      <div className="auth-bg-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
      </div>
    </div>
  );
}
