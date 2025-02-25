import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Admin = ({ onLogout }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', description: '', img: '', show: true });
    const [editingPost, setEditingPost] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(null);
    const navigate = useNavigate();
    const apiUrl = 'https://67b826a62bddacfb27112746.mockapi.io/blog';
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const [currentPostIndex, setCurrentPostIndex] = useState(0);


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleCreatePost = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const createdPost = await response.json();
            setPosts([...posts, createdPost]);
            setNewPost({ title: '', description: '', img: '', show: true });
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`${apiUrl}/${postId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleUpdatePost = async (postId, updatedData) => {
        try {
            const response = await fetch(`${apiUrl}/${postId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedPost = await response.json();
            setPosts(posts.map(post => (post.id === postId ? updatedPost : post)));
            setEditingPost(null);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleEditClick = (post) => {
        setEditingPost(post);
        setNewPost({ ...post });
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
        setNewPost({ title: '', description: '', img: '', show: true });
    };

    const handleViewClick = (postId) => {
        navigate(`/blog/${postId}`);
    };

    const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

    const toggleDescription = (postId) => {
        setShowFullDescription(showFullDescription === postId ? null : postId);
    };


    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCurrentPostIndex(0);
    };


    const handleNext = () => {
        setCurrentPostIndex((prevIndex) => (prevIndex + 1) % currentPosts.length);


    }

    const handlePrev = () => {
        setCurrentPostIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + currentPosts.length) % currentPosts.length;
            return newIndex; 

        });
    }



    return (
        <div className="admin-container">
            <div className="sidebar">
                <button className="logout-button" onClick={handleLogoutClick}>Logout</button>

                <div className="create-form">
                    <h2>Create New Post</h2>
                    <input type="text" placeholder="Image URL" value={newPost.img} onChange={e => setNewPost({ ...newPost, img: e.target.value })} />
                    <input type="text" placeholder="Title" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
                    <textarea placeholder="Description" value={newPost.description} onChange={e => setNewPost({ ...newPost, description: e.target.value })} />
                    <button onClick={handleCreatePost}>Create Post</button>
                </div>
            </div>

            <div className="main-content">
                <h2 className="section-title">Admin Panel</h2>

                <div className="post-list">
                    {currentPosts.map((post, index) => (
                        currentPostIndex === index && (
                            <div className="post-card" key={post.id}>
                                <img src={post.img} alt={post.title} className="post-image" />
                                <h3>{post.title}</h3>
                                <p className="post-description">{post.description}</p>
                                <p>Show: {post.show ? 'Yes' : 'No'}</p>
                                <div className="button-group">
                                    <button onClick={() => handleViewClick(post.id)}>View</button>
                                    <button onClick={() => handleEditClick(post)}>Edit</button>
                                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    ))}

                    <div className="pagination">
                        <button onClick={handlePrev} disabled={currentPostIndex === 0}>
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>

                        ))}

                        <button onClick={handleNext} disabled={currentPostIndex === currentPosts.length - 1}>
                            Next
                        </button>
                    </div>

                    {editingPost && (
                        <div className="form-container edit-form">
                            <h2>Edit Post</h2>
                            <input type="text" placeholder="Image URL" value={newPost.img} onChange={e => setNewPost({ ...newPost, img: e.target.value })} />
                            <input type="text" placeholder="Title" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
                            <textarea placeholder="Description" value={newPost.description} onChange={e => setNewPost({ ...newPost, description: e.target.value })} />
                            <select value={newPost.show} onChange={e => setNewPost({ ...newPost, show: e.target.value === 'true' })}>
                                <option value="true">Show</option>
                                <option value="false">Hide</option>
                            </select>
                            <button onClick={() => handleUpdatePost(newPost.id, newPost)}>Save Changes</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;