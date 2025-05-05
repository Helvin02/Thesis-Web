import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLungs, FaUser, FaSignOutAlt, FaChartLine, FaUpload, FaHistory, FaInfoCircle, FaSun, FaMoon, FaFileImage, FaFilePdf, FaFile, FaEye } from 'react-icons/fa';
import './Homepage.css';
import { ThemeContext } from './ThemeContext';
import UploadModal from './UploadModal';

function Homepage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // Get current user from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      // Redirect to login if no user is found
      navigate('/');
      return;
    }
    setCurrentUser(user);
    
    // Load recent uploads
    loadRecentUploads();
  }, [navigate]);
  
  // Reload recent uploads when the upload modal is closed
  useEffect(() => {
    if (!showUploadModal) {
      loadRecentUploads();
    }
  }, [showUploadModal]);

  const loadRecentUploads = () => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    // Sort by date (newest first) and take the 3 most recent
    const sortedUploads = [...uploadedFiles].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    ).slice(0, 3);
    
    setRecentUploads(sortedUploads);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <FaFileImage className="file-icon image-icon" />;
    } else if (fileType === 'application/pdf') {
      return <FaFilePdf className="file-icon pdf-icon" />;
    } else {
      return <FaFile className="file-icon" />;
    }
  };

  if (!currentUser) {
    return <div className={`loading ${darkMode ? 'dark-mode' : ''}`}>Loading...</div>;
  }

  return (
    <div className={`homepage-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FaLungs className="sidebar-logo" />
          <h2>Lungevity</h2>
        </div>
        
        <div className="sidebar-menu">
          <div className="sidebar-menu-item active">
            <FaChartLine />
            <span>Dashboard</span>
          </div>
          <div className="sidebar-menu-item" onClick={handleUpload}>
            <FaUpload />
            <span>Upload Scan</span>
          </div>
          <div className="sidebar-menu-item">
            <FaHistory />
            <span>History</span>
          </div>
          <div className="sidebar-menu-item">
            <FaInfoCircle />
            <span>About</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Welcome, {currentUser.username}!</h1>
          <div className="user-profile">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="user-info">
              <span>{currentUser.username}</span>
              <small>{currentUser.email}</small>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard">
          <div className="dashboard-card welcome-card">
            <h2>Lung Cancer Detection Tool</h2>
            <p>Upload your lung scans to get AI-powered analysis and detection</p>
            <button className="upload-button" onClick={handleUpload}>
              <FaUpload /> Upload Scan
            </button>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Recent Activity</h3>
              <div className="activity-empty">
                <p>No recent scans found</p>
                <small>Your scan history will appear here</small>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>Quick Stats</h3>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Scans Analyzed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Detections</div>
                </div>
              </div>
            </div>
            
            {/* Recent Uploads Card */}
            <div className="dashboard-card">
              <h3>Recent Uploads</h3>
              {recentUploads.length > 0 ? (
                <div className="recent-uploads-list">
                  {recentUploads.map(file => (
                    <div key={file.id} className="recent-upload-item">
                      <div className="recent-upload-icon">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="recent-upload-details">
                        <div className="recent-upload-name">{file.name}</div>
                        <div className="recent-upload-date">{formatDate(file.date)}</div>
                      </div>
                      {file.url && (
                        <button 
                          className="view-file-button"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <FaEye />
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="view-all-uploads">
                    <button className="view-all-button" onClick={handleUpload}>
                      View All Uploads
                    </button>
                  </div>
                </div>
              ) : (
                <div className="uploads-empty">
                  <p>No uploads yet</p>
                  <small>Your recent uploads will appear here</small>
                </div>
              )}
            </div>
            
            <div className="dashboard-card">
              <h3>How It Works</h3>
              <ol className="how-it-works">
                <li>Upload your lung scan images</li>
                <li>Our AI analyzes your scans</li>
                <li>View detailed results and recommendations</li>
                <li>Share with your healthcare provider</li>
              </ol>
            </div>
            
            <div className="dashboard-card">
              <h3>Resources</h3>
              <ul className="resources-list">
                <li><a href="#education">Educational Materials</a></li>
                <li><a href="#support">Support Groups</a></li>
                <li><a href="#research">Latest Research</a></li>
                <li><a href="#faq">Frequently Asked Questions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Theme Toggle Button */}
      <div className="theme-toggle-float" onClick={toggleDarkMode}>
        {darkMode ? 
          <FaSun className="theme-toggle-icon" /> : 
          <FaMoon className="theme-toggle-icon" />
        }
      </div>

      {/* Enhanced Upload Modal */}
      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
        darkMode={darkMode}
      />
    </div>
  );
}

export default Homepage;