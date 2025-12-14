import React, { useState, useRef, useEffect } from 'react';
import './ProfileSettings.css';
import { uploadAPI, getImageUrl, authAPI } from '../services/api';

function ProfileSettings({ currentUser, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
    height: '',
    gender: '',
    religion: '',
    caste: '',
    location: '',
    education: '',
    profession: '',
    income: '',
    maritalStatus: 'never_married',
    motherTongue: '',
    about: '',
    familyType: '',
    fatherOccupation: '',
    motherOccupation: '',
    siblings: '',
    partnerAgeRange: '',
    partnerHeightRange: '',
    partnerReligion: '',
    partnerCaste: '',
    partnerEducation: '',
    partnerProfession: '',
    partnerLocation: '',
    partnerDescription: ''
  });
  const [success, setSuccess] = useState('');

  // Fetch complete user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        if (response.data.success) {
          const user = response.data.user;
          setUserData(user);
          
          // Set profile image
          if (user.profileImage) {
            setProfileImage(getImageUrl(user.profileImage));
          }
          
          // Populate form data
          setFormData({
            name: user.name || '',
            email: user.email || '',
            mobile: user.mobile || '',
            age: user.age || '',
            height: user.height || '',
            gender: user.gender || '',
            religion: user.religion || '',
            caste: user.caste || '',
            location: user.location || '',
            education: user.education || '',
            profession: user.profession || '',
            income: user.income || '',
            maritalStatus: user.maritalStatus || 'never_married',
            motherTongue: user.motherTongue || '',
            about: user.about || '',
            familyType: user.familyType || '',
            fatherOccupation: user.fatherOccupation || '',
            motherOccupation: user.motherOccupation || '',
            siblings: user.siblings || '',
            partnerAgeRange: user.partnerPreferences?.ageRange || '',
            partnerHeightRange: user.partnerPreferences?.heightRange || '',
            partnerReligion: user.partnerPreferences?.religion || '',
            partnerCaste: user.partnerPreferences?.caste || '',
            partnerEducation: user.partnerPreferences?.education || '',
            partnerProfession: user.partnerPreferences?.profession || '',
            partnerLocation: user.partnerPreferences?.location || '',
            partnerDescription: user.partnerPreferences?.description || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepare data with partner preferences
      const updateData = {
        ...formData,
        partnerPreferences: {
          ageRange: formData.partnerAgeRange,
          heightRange: formData.partnerHeightRange,
          religion: formData.partnerReligion,
          caste: formData.partnerCaste,
          education: formData.partnerEducation,
          profession: formData.partnerProfession,
          location: formData.partnerLocation,
          description: formData.partnerDescription
        }
      };
      
      await onUpdateProfile(updateData);
      
      // Refresh user data
      const response = await authAPI.getCurrentUser();
      if (response.data.success) {
        setUserData(response.data.user);
      }
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Only JPG, PNG, and GIF files are allowed');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const response = await uploadAPI.uploadProfilePhoto(file);
      
      if (response.data.success) {
        const imageUrl = getImageUrl(response.data.photoUrl);
        setProfileImage(imageUrl);
        setSuccess('Photo uploaded successfully!');
        
        // Update current user
        onUpdateProfile({ profileImage: response.data.photoUrl });
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm('Are you sure you want to delete your profile photo?')) {
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const response = await uploadAPI.deleteProfilePhoto();
      
      if (response.data.success) {
        setProfileImage(null);
        setSuccess('Photo deleted successfully!');
        onUpdateProfile({ profileImage: null });
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setUploadError('Failed to delete photo');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        mobile: userData.mobile || '',
        age: userData.age || '',
        height: userData.height || '',
        gender: userData.gender || '',
        religion: userData.religion || '',
        caste: userData.caste || '',
        location: userData.location || '',
        education: userData.education || '',
        profession: userData.profession || '',
        income: userData.income || '',
        maritalStatus: userData.maritalStatus || 'never_married',
        motherTongue: userData.motherTongue || '',
        about: userData.about || '',
        familyType: userData.familyType || '',
        fatherOccupation: userData.fatherOccupation || '',
        motherOccupation: userData.motherOccupation || '',
        siblings: userData.siblings || '',
        partnerAgeRange: userData.partnerPreferences?.ageRange || '',
        partnerHeightRange: userData.partnerPreferences?.heightRange || '',
        partnerReligion: userData.partnerPreferences?.religion || '',
        partnerCaste: userData.partnerPreferences?.caste || '',
        partnerEducation: userData.partnerPreferences?.education || '',
        partnerProfession: userData.partnerPreferences?.profession || '',
        partnerLocation: userData.partnerPreferences?.location || '',
        partnerDescription: userData.partnerPreferences?.description || ''
      });
    }
    setIsEditing(false);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="profile-settings-page">
        <div className="profile-settings-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-settings-page">
      <div className="profile-settings-container">
        <div className="settings-header">
          <h2>My Profile</h2>
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="action-buttons">
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button className="save-btn" onClick={handleSubmit}>Save Changes</button>
            </div>
          )}
        </div>

        {success && <div className="success-banner">{success}</div>}

        <form className="settings-form" onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <section className="settings-section">
            <h3>Profile Picture</h3>
            <div className="profile-picture-section">
              <div className="profile-avatar">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-image-preview" />
                ) : (
                  <span className="avatar-icon">
                    {formData.gender === 'male' ? '👨' : formData.gender === 'female' ? '👩' : '👤'}
                  </span>
                )}
              </div>
              <div className="picture-info">
                <p>Upload your best photo to get more responses</p>
                <p className="file-hint">Max size: 5MB • Formats: JPG, PNG, GIF</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button 
                    type="button" 
                    className="upload-btn" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? '⏳ Uploading...' : '📷 Upload Photo'}
                  </button>
                  {profileImage && (
                    <button 
                      type="button" 
                      className="delete-photo-btn" 
                      onClick={handleDeletePhoto}
                      disabled={uploading}
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
                {uploadError && <p className="upload-error">{uploadError}</p>}
              </div>
            </div>
          </section>

          {/* Basic Information */}
          <section className="settings-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-field">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-field">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="form-field">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter age"
                />
              </div>
              <div className="form-field">
                <label>Height</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., 5'10&quot;"
                />
              </div>
              <div className="form-field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-field">
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="never_married">Never Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                </select>
              </div>
              <div className="form-field">
                <label>Mother Tongue</label>
                <input
                  type="text"
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Hindi, Tamil"
                />
              </div>
            </div>
          </section>

          {/* Religious Background */}
          <section className="settings-section">
            <h3>Religious Background</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="hindu">Hindu</option>
                  <option value="muslim">Muslim</option>
                  <option value="christian">Christian</option>
                  <option value="sikh">Sikh</option>
                  <option value="buddhist">Buddhist</option>
                  <option value="jain">Jain</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label>Caste</label>
                <select
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Select Caste</option>
                  <option value="brahmin">Brahmin</option>
                  <option value="rajput">Rajput</option>
                  <option value="maratha">Maratha</option>
                  <option value="patel">Patel (Patidar)</option>
                  <option value="jat">Jat</option>
                  <option value="yadav">Yadav</option>
                  <option value="kayastha">Kayastha</option>
                  <option value="bania">Bania</option>
                  <option value="agarwal">Agarwal</option>
                  <option value="khatri">Khatri</option>
                  <option value="vaishya">Vaishya</option>
                  <option value="kshatriya">Kshatriya</option>
                  <option value="kurmi">Kurmi</option>
                  <option value="gupta">Gupta</option>
                  <option value="arora">Arora</option>
                  <option value="saini">Saini</option>
                  <option value="gujjar">Gujjar</option>
                  <option value="lohar">Lohar</option>
                  <option value="kumhar">Kumhar</option>
                  <option value="mali">Mali</option>
                  <option value="sonar">Sonar</option>
                  <option value="vishwakarma">Vishwakarma</option>
                  <option value="nadar">Nadar</option>
                  <option value="ezhava">Ezhava</option>
                  <option value="reddy">Reddy</option>
                  <option value="kamma">Kamma</option>
                  <option value="naidu">Naidu</option>
                  <option value="vokkaliga">Vokkaliga</option>
                  <option value="lingayat">Lingayat</option>
                  <option value="iyer">Iyer</option>
                  <option value="iyengar">Iyengar</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="settings-section">
            <h3>Location</h3>
            <div className="form-grid">
              <div className="form-field full-width">
                <label>City/Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter city"
                />
              </div>
            </div>
          </section>

          {/* Education & Career */}
          <section className="settings-section">
            <h3>Education & Career</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., MBA, B.Tech"
                />
              </div>
              <div className="form-field">
                <label>Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="form-field">
                <label>Annual Income</label>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., ₹8-10 Lakhs"
                />
              </div>
            </div>
          </section>

          {/* Family Details */}
          <section className="settings-section">
            <h3>Family Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Family Type</label>
                <select
                  name="familyType"
                  value={formData.familyType}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="joint">Joint Family</option>
                  <option value="nuclear">Nuclear Family</option>
                </select>
              </div>
              <div className="form-field">
                <label>Father's Occupation</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter occupation"
                />
              </div>
              <div className="form-field">
                <label>Mother's Occupation</label>
                <input
                  type="text"
                  name="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter occupation"
                />
              </div>
              <div className="form-field">
                <label>Siblings</label>
                <input
                  type="text"
                  name="siblings"
                  value={formData.siblings}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., 1 Brother, 1 Sister"
                />
              </div>
            </div>
          </section>

          {/* About Me */}
          <section className="settings-section">
            <h3>About Me</h3>
            <div className="form-field full-width">
              <label>Tell us about yourself</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                disabled={!isEditing}
                rows="5"
                placeholder="Write a brief description about yourself, your interests, hobbies, values, and personality..."
              />
            </div>
          </section>

          {/* Partner Preferences */}
          <section className="settings-section">
            <h3>Partner Preferences</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Preferred Age Range</label>
                <input
                  type="text"
                  name="partnerAgeRange"
                  value={formData.partnerAgeRange}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., 25-30 years"
                />
              </div>
              <div className="form-field">
                <label>Preferred Height Range</label>
                <input
                  type="text"
                  name="partnerHeightRange"
                  value={formData.partnerHeightRange}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., 5'5&quot; - 5'10&quot;"
                />
              </div>
              <div className="form-field">
                <label>Preferred Religion</label>
                <input
                  type="text"
                  name="partnerReligion"
                  value={formData.partnerReligion}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Any or specific"
                />
              </div>
              <div className="form-field">
                <label>Preferred Caste</label>
                <input
                  type="text"
                  name="partnerCaste"
                  value={formData.partnerCaste}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Any or specific"
                />
              </div>
              <div className="form-field">
                <label>Preferred Education</label>
                <input
                  type="text"
                  name="partnerEducation"
                  value={formData.partnerEducation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Graduate, Post-Graduate"
                />
              </div>
              <div className="form-field">
                <label>Preferred Profession</label>
                <input
                  type="text"
                  name="partnerProfession"
                  value={formData.partnerProfession}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Any or specific"
                />
              </div>
              <div className="form-field full-width">
                <label>Preferred Location</label>
                <input
                  type="text"
                  name="partnerLocation"
                  value={formData.partnerLocation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Mumbai, Delhi, or Any"
                />
              </div>
            </div>
            <div className="form-field full-width" style={{ marginTop: '20px' }}>
              <label>Additional Partner Preferences</label>
              <textarea
                name="partnerDescription"
                value={formData.partnerDescription}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
                placeholder="Describe your ideal partner's qualities, values, lifestyle preferences..."
              />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
