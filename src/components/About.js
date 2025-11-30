import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-2">NewsMonkey</h1>
          <p className="text-muted mb-4">
            NewsMonkey is a lightweight, responsive news aggregator built with React. It fetches top headlines by category and presents them in a clean, readable layout with optional dark mode.
          </p>

          <h5 className="mb-2">Key features</h5>
          <ul>
            <li>Category-based news browsing (Business, Entertainment, Health, Science, Sports, Technology)</li>
            <li>Progress indicator for fetch operations</li>
            <li>Lazy-loaded pages and components for faster initial load</li>
            <li>Dark / Light theme toggle with CSS variables</li>
            <li>Robust fetch with AbortController and error handling</li>
            <li>Accessible, responsive UI using Bootstrap</li>
          </ul>

          <h5 className="mt-4 mb-2">Tech stack</h5>
          <p className="mb-3">
            React, React Router, Bootstrap, react-top-loading-bar, News API
          </p>

          <div className="d-flex gap-3 flex-wrap">
            <a className="btn btn-primary btn-sm" href="https://github.com/Sreenidhi20/NewsApp" target="_blank" rel="noreferrer">View on GitHub</a>
            <Link className="btn btn-outline-secondary btn-sm" to="/">Back to News</Link>
          </div>

          <hr className="my-4" />

          <div className="small text-muted">
            <strong>Author:</strong> Sreenidhi — <a href="mailto:you@example.com">sreenidhibs04@gmail.com</a><br />
            <strong>Version:</strong> 1.0.0 • <strong>License:</strong> MIT
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
