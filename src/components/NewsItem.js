import React from "react";
import "./News.css";

const NewsItem = (props) => {
  let { title, description, imageurl, newsurl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card h-100 shadow-sm border-0 rounded-4">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className=" badge rounded-pill bg-danger">{source}</span>
        </div>
        <img src={imageurl} className="card-img-top news-image" alt="..." />
        <div className="card-body">
          <h5 className="card-title fw-bold">{a.title}</h5>
          <p className="card-text text-secondary">
            {a.description || "Read more in the full article."}
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={a.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
