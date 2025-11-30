import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error?.toString?.() || null };
  }

  componentDidCatch(error, info) {
    // keep logging minimal but useful
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, errorInfo: null });
    // attempt a soft reload of the current app state
    if (window && window.location) window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container my-5">
          <div className="alert alert-danger shadow-sm">
            <h4 className="alert-heading">Something went wrong</h4>
            <p>We encountered an unexpected error. You can try reloading the page.</p>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-danger" onClick={this.handleReload}>Reload</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Go to top</button>
            </div>
            <hr />
            <small className="text-muted">If the problem persists, check the browser console or contact support.</small>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;