import React, { useState } from 'react';
import { Card, Button } from '../../lib';
import { useUser, useTheme } from '../../contexts';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    role: user.role,
    email: user.email || 'john.doe@example.com',
    bio: 'React developer passionate about building amazing user experiences.'
  });

  const handleSave = () => {
    // In a real app, this would update the user context/API
    console.log('Saving user data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      role: user.role,
      email: user.email || 'john.doe@example.com',
      bio: 'React developer passionate about building amazing user experiences.'
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>User Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="profile-content">
          {/* Profile Information */}
          <section className="profile-info">
            <Card title="Profile Information" variant="outlined">
              <div className="profile-card">
                <div className="profile-avatar">
                  <img src={user.avatar} alt={user.name} />
                  <Button variant="ghost" size="small">
                    Change Photo
                  </Button>
                </div>

                <div className="profile-details">
                  {isEditing ? (
                    <div className="edit-form">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Role</label>
                        <input
                          type="text"
                          value={editData.role}
                          onChange={(e) => setEditData({...editData, role: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Bio</label>
                        <textarea
                          value={editData.bio}
                          onChange={(e) => setEditData({...editData, bio: e.target.value})}
                          rows="3"
                        />
                      </div>
                      <div className="form-actions">
                        <Button variant="primary" onClick={handleSave}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="view-mode">
                      <h3>{editData.name}</h3>
                      <p className="role">{editData.role}</p>
                      <p className="email">{editData.email}</p>
                      <p className="bio">{editData.bio}</p>
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </section>

          {/* Settings */}
          <section className="profile-settings">
            <Card title="Preferences" variant="outlined">
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Theme</h4>
                    <p>Choose your preferred theme</p>
                  </div>
                  <div className="setting-control">
                    <Button
                      variant={theme === 'light' ? 'primary' : 'secondary'}
                      onClick={toggleTheme}
                    >
                      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </Button>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Notifications</h4>
                    <p>Email notifications for task updates</p>
                  </div>
                  <div className="setting-control">
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Data Export</h4>
                    <p>Download your task data</p>
                  </div>
                  <div className="setting-control">
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;