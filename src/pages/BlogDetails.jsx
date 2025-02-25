import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './blogdetails.css';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`https://67b826a62bddacfb27112746.mockapi.io/blog/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching blog post:', error));
    }, [id]);

    if (!post) {
        return <p>Loading blog...</p>;
    }

    return (
        <div className="blog-details">
            {/* Back button */}
            <button className="back-button" onClick={() => navigate('/blog')}>
                ←
            </button>

            {/* Blog Title */}
            <h2 className="blog-title">{post.title}</h2>

            {/* Blog Image */}
            <img src={post.img} alt={post.title} className="blog-img" />

            {/* Blog Content */}
            {/* Blog Content */}
            <div className="blog-content">  
                {post.description.split("\n").map((para, index) => {
        // Check if a paragraph is a subheading (you may need a better check)
                const isSubheading = para.trim().length < 50 && !para.includes(".");
        
                return (
                    <p key={index} className={isSubheading ? "subheading" : ""}>
                        {isSubheading ? <strong>{para}</strong> : para}
                    </p>
                );
                })}
            </div>

        </div>
    );
};

export default BlogDetails;
