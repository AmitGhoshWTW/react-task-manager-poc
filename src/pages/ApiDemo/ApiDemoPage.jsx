import React, { useState } from 'react';
import { Card, Button } from '../../lib';
import { useUsers, usePosts, useApi } from '../../hooks/useApi';
import { apiService } from '../../services/api';
import Modal from '../../components/common/Modal/Modal';
// import './ApiDemoPage.css';

const ApiDemoPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Using custom hooks for API calls
  const { data: users, loading: usersLoading, error: usersError, retry: retryUsers } = useUsers();
  const { data: posts, loading: postsLoading, error: postsError } = usePosts();
  
  // Manual API call example
  const { 
    data: userDetails, 
    loading: userDetailsLoading, 
    execute: fetchUserDetails 
  } = useApi(apiService.getUser);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    await fetchUserDetails(user.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="api-demo-page">
      <div className="container">
        <h1>API Integration Demo</h1>
        <p>This page demonstrates real API calls, error handling, and loading states.</p>

        {/* Users Section */}
        <section className="api-section">
          <Card title="Users from API" variant="outlined">
            {usersLoading && <div className="loading">Loading users...</div>}
            
            {usersError && (
              <div className="error">
                <p>Failed to load users: {usersError.message}</p>
                <Button variant="secondary" onClick={retryUsers}>
                  Retry
                </Button>
              </div>
            )}
            
            {users && (
              <div className="users-grid">
                {users.map(user => (
                  <div 
                    key={user.id} 
                    className="user-card"
                    onClick={() => handleUserClick(user)}
                  >
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <p>{user.company?.name}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>

        {/* Posts Section */}
        <section className="api-section">
          <Card title="Latest Posts" variant="elevated">
            {postsLoading && <div className="loading">Loading posts...</div>}
            
            {postsError && (
              <div className="error">Failed to load posts: {postsError.message}</div>
            )}
            
            {posts && (
              <div className="posts-list">
                {posts.map(post => (
                  <div key={post.id} className="post-item">
                    <h4>{post.title}</h4>
                    <p>{post.body.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>

        {/* User Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedUser ? `User: ${selectedUser.name}` : 'User Details'}
          size="medium"
        >
          {userDetailsLoading && <div className="loading">Loading user details...</div>}
          
          {userDetails && (
            <div className="user-details">
              <div className="detail-row">
                <strong>Name:</strong> {userDetails.name}
              </div>
              <div className="detail-row">
                <strong>Username:</strong> {userDetails.username}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {userDetails.email}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {userDetails.phone}
              </div>
              <div className="detail-row">
                <strong>Website:</strong> {userDetails.website}
              </div>
              <div className="detail-row">
                <strong>Company:</strong> {userDetails.company?.name}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> 
                {userDetails.address && (
                  <span>
                    {userDetails.address.street}, {userDetails.address.city}
                  </span>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ApiDemoPage;