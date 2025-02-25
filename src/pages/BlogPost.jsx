import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogPost = ({ id,img, title, description, show }) => {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/blog/${id}`); // Navigate to the full blog post page
    };


        return (
            <div className='blog__post'>
                <img src={img} alt={title} className='blog__img' />
                <div className="blog__content">
                    <h3 className="blog__title">{title}</h3>
                    <p className="blog__description">{description.length > 100 ? `${description.substring(0, 100)}...` : description}</p>
                    <button onClick={handleReadMore} className="read-more-btn">Read More</button>

                </div>
            </div>
        )
}
export default BlogPost
