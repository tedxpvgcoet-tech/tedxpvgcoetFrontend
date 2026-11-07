import React, { useState } from "react";
import { BLOG_CATEGORIES, BLOGS_DATA } from "../data/blogsData";
import { FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import bgVideo from "../assets/backgrounds/background.mp4";
import "./Blogs.css";

const Blogs = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredBlogs =
    activeFilter === "All"
      ? BLOGS_DATA
      : BLOGS_DATA.filter((blog) => blog.category === activeFilter);

  const handleCardClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="blogs-page">
      {/* Floating Animated Background Video */}
      <video autoPlay loop muted playsInline className="blogs-bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="blogs-container">
        <h1 className="blogs-heading">Blogs</h1>

        {/* Filter Bar */}
        <div className="blogs-filter-bar">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="blogs-grid">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              data-id={blog.id}
              className="blog-card"
              onClick={() => handleCardClick(blog.url)}
              role="button"
              tabIndex={0}
            >
              <div className="blog-thumbnail-wrapper">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="blog-thumbnail"
                  loading="lazy"
                />
                <div className="read-overlay">
                  <span className="read-btn-pill">
                    Read on Substack <FaExternalLinkAlt className="ext-icon" />
                  </span>
                </div>
              </div>

              <div className="blog-info">
                <div className="blog-meta">
                  <span className="blog-category">
                    {blog.category.toUpperCase()}
                  </span>
                  {blog.readTime && (
                    <span className="blog-read-time">
                      {" • "}
                      {blog.readTime}
                    </span>
                  )}
                </div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>
                <div className="blog-footer-link">
                  <span>Read Article</span>
                  <FaBookOpen className="book-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
