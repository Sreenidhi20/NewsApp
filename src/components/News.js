import React, { useEffect, useState, useRef } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = ({ apikey = "", pageSize = 15, country = "us", category = "general", setProgress = () => {} }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const buildUrl = (p = page) => {
    const params = new URLSearchParams({
      country,
      category,
      page: String(p),
    });
    return `/api/news?${params.toString()}`;
  };

  useEffect(() => {
    // Cancel previous fetches and reset states when category changes
    setArticles([]);
    setPage(1);
    setTotalResults(0);
    setError(null);
  }, [category, apikey, country, pageSize]);

  useEffect(() => {
    // main fetch with AbortController and progress callbacks
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchArticles = async () => {
      try {
        setLoading(true);
        setProgress(10);
        const url = buildUrl(page);

        setProgress(30);
        const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
        setProgress(60);

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Network response was not ok: ${res.status} ${text}`);
        }

        const data = await res.json();
        setProgress(85);

        if (data.status !== "ok") {
          throw new Error(data.message || "API returned an error");
        }

        setArticles(prev => [...prev, ...(data.articles || [])]);
        setTotalResults(data.totalResults || 0);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          // fetch aborted - ignore
          return;
        }
        console.error("Failed to load news:", err);
        setError(err.message || "Failed to load news");
      } finally {
        setLoading(false);
        setProgress(100);
      }
    };

    fetchArticles();

    return () => {
      // cleanup
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, apikey]); // intentional: react-hooks/exhaustive-deps disabled to avoid over-triggering

  const handleLoadMore = () => {
    if (articles.length < totalResults && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3 text-capitalize">
        Top {category} Headlines
      </h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {articles.map((a, i) => (
          <div className="col-md-4 mb-4" key={`${a.url || i}`}>
            <div className="card h-100 shadow-sm">
              {a.urlToImage ? (
                <img src={a.urlToImage} className="card-img-top" alt={a.title || "news"} />
              ) : (
                <div className="card-img-top placeholder-image" />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{a.title}</h5>
                <p className="card-text text-muted small mb-2">{a.source?.name || "Unknown source"} • {new Date(a.publishedAt).toLocaleString()}</p>
                <p className="card-text mb-3" style={{ flexGrow: 1 }}>{a.description || "Read more in the full article."}</p>
                <div className="mt-auto">
                  <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                    Read
                  </a>
                  <span className="badge bg-secondary ms-2">{a.author || "Unknown"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Spinner />
        </div>
      )}

      {!loading && articles.length < totalResults && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary mb-4" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}

      {!loading && articles.length === 0 && !error && (
        <div className="text-center text-muted py-5">No articles available.</div>
      )}
    </div>
  );
};

export default News;
