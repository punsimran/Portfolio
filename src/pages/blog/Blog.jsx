import React from 'react';
import './blog.css';
import Blog1 from '../../assets/blog-1.jpg'
import Blog2 from '../../assets/blog-2.jpg'
import Blog3 from '../../assets/blog-3.jpg'

const blog = () => {
  return (
    <section className='blog container section' id='blog'>
      <h2 className="section__title">Latest Posts</h2>

      <div className="blog__container grid">
        <div className="blog__card">
          <div className="blog__thumb">
            <a href=""><span className="blog__category">Reviews</span></a>
            <a href=""><img src={Blog1} alt=""
            className='blog__img' /></a>
          </div>
          <div className="blog__details">
            <h3 className="blog__title">10 Must-Know Machine Learning Algorithms for Data Scientists</h3>
            <div className="blog__meta">
              <span>30 Aug, 2024</span>
              <span className="blog__dot">.</span>
              <span>Simran Pun</span>
            </div>
          </div>
        </div>

        <div className="blog__card">
          <div className="blog__thumb">
            <a href=""><span className="blog__category">Tutorial</span></a>
            <a href=""><img src={Blog2} alt=""
            className='blog__img' /></a>
          </div>
          <div className="blog__details">
            <h3 className="blog__title">When You Stop Trying to Control Everything, Life Moves Forward</h3>
            <div className="blog__meta">
              <span>06 Jan, 2023</span>
              <span className="blog__dot">.</span>
              <span>Simran Pun</span>
            </div>
          </div>
        </div>

        <div className="blog__card">
          <div className="blog__thumb">
            <a href=""><span className="blog__category">Business</span></a>
            <a href=""><img src={Blog3} alt=""
            className='blog__img' /></a>
          </div>
          <div className="blog__details">
            <h3 className="blog__title">The Fastest Way To Build A One-Person Business (Beginner Guide)</h3>
            <div className="blog__meta">
              <span>07 April, 2024</span>
              <span className="blog__dot">.</span>
              <span>Simran Pun</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default blog
