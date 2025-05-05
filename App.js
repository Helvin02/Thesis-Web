import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';
import Navbar from './Navbar';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="app-container">
              <Navbar />
              <Login />
            </div>
          } />
          <Route path="/register" element={
            <div className="app-container">
              <Navbar />
              <Register />
            </div>
          } />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;