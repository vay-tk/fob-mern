import React, { useState } from 'react';
import axios from "axios";
import '../css/Report.css';

const Report = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState({
    photos: [],
    videos: []
  });
  const [photosPreview, setPhotosPreview] = useState([]);
  const [videosPreview, setVideosPreview] = useState([]);

  // Handle file selection and preview update
  const handleFileChange = (e, type) => {
    const selectedFiles = Array.from(e.target.files);
    if (type === 'photos') {
      setFiles(prev => ({ ...prev, photos: [...prev.photos, ...selectedFiles] }));
      setPhotosPreview(prev => [...prev, ...selectedFiles.map(file => URL.createObjectURL(file))]);
    } else if (type === 'videos') {
      setFiles(prev => ({ ...prev, videos: [...prev.videos, ...selectedFiles] }));
      setVideosPreview(prev => [...prev, ...selectedFiles.map(file => URL.createObjectURL(file))]);
    }
  };

  // Handle individual file removal
  const handleRemoveFile = (type, index, event) => {
    event.preventDefault(); // Prevent form submission

    if (type === 'photos') {
      setPhotosPreview(prev => prev.filter((_, i) => i !== index));
      setFiles(prev => ({
        ...prev,
        photos: prev.photos.filter((_, i) => i !== index)
      }));
    } else if (type === 'videos') {
      setVideosPreview(prev => prev.filter((_, i) => i !== index));
      setFiles(prev => ({
        ...prev,
        videos: prev.videos.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);
    setStatusMessage('Uploading...');

    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("address", event.target.address.value);

    // Append only the remaining photos
    files.photos.forEach((file) => {
      formData.append("photo", file);
    });

    // Append only the remaining videos
    files.videos.forEach((file) => {
      formData.append("video", file);
    });

    try {
      const response = await axios.post("http://localhost:3000/submit-form", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (response.status === 200) {
        setStatusMessage("Thank you! Your report has been submitted successfully.");

        // Reset form only when truly completed
        setTimeout(() => {
          setUploadProgress(0);
          setIsSubmitting(false);
          event.target.reset();
          setFiles({ photos: [], videos: [] });
          setPhotosPreview([]);
          setVideosPreview([]);
        }, 1500);
      } else {
        setStatusMessage("Submission failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Report an Issue</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required placeholder="Enter your full name" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Location Details</label>
          <textarea id="address" name="address" required placeholder="Describe the location of the issue" rows="4"></textarea>
        </div>

        {/* Photo Upload */}
        <div className="form-group file-input-container">
          <label className="file-input-label" htmlFor="photo">
            Upload Photos
            <input type="file" id="photo" name="photo" accept="image/*" multiple onChange={(e) => handleFileChange(e, 'photos')} />
          </label>
          {photosPreview.length > 0 && (
            <div className="preview-container">
              {photosPreview.map((src, index) => (
                <div key={index} className="media-preview-wrapper">
                  <img src={src} alt={`preview-${index}`} className="media-preview" />
                  <button className="remove-btn" onClick={(event) => handleRemoveFile('photos', index, event)}>❌</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div className="form-group file-input-container">
          <label className="file-input-label" htmlFor="video">
            Upload Videos
            <input type="file" id="video" name="video" accept="video/*" multiple onChange={(e) => handleFileChange(e, 'videos')} />
          </label>
          {videosPreview.length > 0 && (
            <div className="preview-container">
              {videosPreview.map((src, index) => (
                <div key={index} className="media-preview-wrapper">
                  <video src={src} className="media-preview" controls />
                  <button className="remove-btn" onClick={(event) => handleRemoveFile('videos', index, event)}>❌</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isSubmitting && (
          <div className="progress-container">
            <progress value={uploadProgress} max="100"></progress>
            <span>{uploadProgress}%</span>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? `Uploading... ${uploadProgress}%` : 'Submit Report'}
        </button>

        {/* Status Message */}
        {statusMessage && (
          <div className={`status-message ${statusMessage.includes('success') ? 'success' : 'error'}`}>
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Report;
