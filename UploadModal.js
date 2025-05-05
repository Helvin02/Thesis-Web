import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaTimes, FaFile, FaFilePdf, FaFileImage } from 'react-icons/fa';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose, darkMode }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Load previously uploaded files when modal opens
  useEffect(() => {
    if (isOpen) {
      const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      setUploadedFiles(files);
    }
  }, [isOpen]);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  if (!isOpen) return null;

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Filter for supported files
    const supportedFiles = files.filter(file => 
      file.type.startsWith('image/') || 
      file.type === 'application/pdf'
    );
    
    if (supportedFiles.length === 0) {
      alert('Please select image files (JPEG, PNG) or PDF documents.');
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...supportedFiles]);
    
    // Create preview URLs
    const newUrls = supportedFiles.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return null; // For non-image files
    });
    
    setPreviewUrls(prev => [...prev, ...newUrls]);
  };

  const removeFile = (index) => {
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
    
    setPreviewUrls(prev => {
      const newUrls = [...prev];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  const handleUpload = () => {
    // Create metadata for uploaded files
    const newUploadedFiles = selectedFiles.map((file, index) => ({
      id: Date.now() + index, // Unique ID for each file
      name: file.name,
      type: file.type,
      size: file.size,
      date: new Date().toISOString(),
      url: previewUrls[index] || null,
      status: 'completed'
    }));
    
    // Combine with existing files
    const updatedFiles = [...uploadedFiles, ...newUploadedFiles];
    
    // Save to localStorage
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    
    // Show success message
    alert(`Successfully uploaded ${selectedFiles.length} file(s)`);
    
    // Reset and close
    setSelectedFiles([]);
    setPreviewUrls([]);
    onClose();
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <FaFileImage />;
    } else if (file.type === 'application/pdf') {
      return <FaFilePdf />;
    } else {
      return <FaFile />;
    }
  };

  return (
    <div className={`upload-modal-overlay ${darkMode ? 'dark-mode' : ''}`}>
      <div className="upload-modal">
        <div className="upload-modal-header">
          <h3>Upload Lung Scan</h3>
          <button 
            className="close-button" 
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="upload-modal-body">
          <div 
            className="upload-area"
            onClick={handleFileSelect}
          >
            <FaUpload className="upload-icon" />
            <p>Click to browse files</p>
            <span>Supported formats: JPEG, PNG, PDF</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              multiple
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="selected-files">
              <h4>Selected Files ({selectedFiles.length})</h4>
              <div className="file-previews">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-preview">
                      {previewUrls[index] ? (
                        <img src={previewUrls[index]} alt={`Preview ${index}`} />
                      ) : (
                        <div className="file-type-icon">
                          {getFileIcon(file)}
                        </div>
                      )}
                      <button 
                        className="remove-file" 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <div className="file-name">{file.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="upload-modal-footer">
          <button 
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="upload-button"
            onClick={handleUpload}
            disabled={selectedFiles.length === 0}
          >
            <FaUpload />
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;