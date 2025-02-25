import React from 'react';
import { useState , useEffect } from "react";
import './blog.css';
import BlogPost from '../BlogPost';
import { useNavigate } from 'react-router-dom';
import Blog1 from '../../assets/blog-1.jpg'
import Blog2 from '../../assets/blog-2.jpg'
import Blog3 from '../../assets/blog-3.jpg'

const Blog = () => {
  const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const apiUrl = 'https://67b826a62bddacfb27112746.mockapi.io/blog';

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

    const handleLoginClick = () => {
        navigate('/login');
    };

    useEffect(() => {
            // Enable scrolling when on BlogDetails page
            document.body.style.overflow = "hidden";
    
            return () => {
                // Disable scrolling when leaving BlogDetails
                document.body.style.overflow = "scroll";
            };
        }, []);
    

  return (
    <section className="blog-page section">
            <h2 className="section__title">My <span>Blog</span></h2>

            {posts.length > 0 ? (
                <div className="blog__container container grid">
                    {posts.map((post) => (
                        <BlogPost key={post.id} {...post} />
                    ))}
                </div>
            ) : (
                <p>Loading blog posts...</p>
            )}
        </section>
  )
}

export default Blog
