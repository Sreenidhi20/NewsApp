import "./App.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import ErrorBoundary from "./components/ErrorBoundary";

const News = lazy(() => import("./components/News"));
const About = lazy(() => import("./components/About"));

const App = () => {
  const pageSize = 15;
  const apikey = process.env.REACT_APP_NEWS_API_KEY || "";
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (!apikey) {
      console.warn("REACT_APP_NEWS_API_KEY not set. App will not fetch live news.");
    }
    // simple theme hook: allow CSS to target [data-theme="dark"]
    document.body.setAttribute("data-theme", theme);
  }, [apikey, theme]);

  const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

  return (
    <div>
      <Router>
        <Navbar theme={theme} onToggleTheme={() => setTheme(prev => (prev === "light" ? "dark" : "light"))} />
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path="/"
                element={
                  <News
                    setProgress={setProgress}
                    apikey={apikey}
                    key="general"
                    pageSize={pageSize}
                    country="us"
                    category="general"
                  />
                }
              />
              {categories
                .filter(c => c !== "general")
                .map(cat => (
                  <Route
                    key={cat}
                    path={`/${cat}`}
                    element={
                      <News
                        setProgress={setProgress}
                        apikey={apikey}
                        key={cat}
                        pageSize={pageSize}
                        country="us"
                        category={cat}
                      />
                    }
                  />
                ))}
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default App;