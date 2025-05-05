import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaLungs, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching username and password
    const user = users.find(
      user => user.username === username && user.password === password
    );
    
    if (user) {
      // Set logged in user in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        username: user.username,
        email: user.email
        // Note: Don't store the password in currentUser
      }));
      
      // Show success message
      alert('Login successful!');
      
      // Redirect to homepage
      navigate('/homepage');
    } else {
      // Show error message
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="login-card">
        <div className="logo-container">
          <FaLungs className="lung-icon" />
          <h1>Lungevity</h1>
          <p>Lung Cancer Detector</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setLoginError('');
              }}
              placeholder="Username"
              required
            />
          </div>
          
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError('');
              }}
              placeholder="Password"
              required
            />
            <div 
              className="password-eye-icon"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          
          {loginError && (
            <div className="password-error">
              {loginError}
            </div>
          )}
          
          <div className="forgot-password">
            <a href="#reset">Forgot Password?</a>
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;