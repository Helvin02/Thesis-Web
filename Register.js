import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaLungs, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  // Check if passwords match whenever either password field changes
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match!');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }

    // Get existing users from localStorage or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      setUsernameError('Username already exists. Please choose another one.');
      return;
    }
    
    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      alert('This email is already registered. Please use another email or login.');
      return;
    }

    // Create new user object
    const newUser = {
      username,
      email,
      password // Note: In a real app, you should never store passwords as plain text!
    };
    
    // Add new user to array
    users.push(newUser);
    
    // Save updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    alert('Registration successful! You can now log in.');
    
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="login-card">
        <div className="logo-container">
          <FaLungs className="lung-icon" />
          <h1>Lungevity</h1>
          <p>Create Your Account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError('');
              }}
              placeholder="Username"
              required
            />
          </div>
          {usernameError && (
            <div className="password-error">
              {usernameError}
            </div>
          )}
          
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <div 
              className="password-eye-icon"
              onMouseDown={() => setShowConfirmPassword(true)}
              onMouseUp={() => setShowConfirmPassword(false)}
              onMouseLeave={() => setShowConfirmPassword(false)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          
          {passwordError && (
            <div className="password-error">
              {passwordError}
            </div>
          )}
          
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
        
        <div className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;