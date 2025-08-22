import React from 'react';
import { Card, Button } from '../../../lib';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to monitoring service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <Card 
            title="Oops! Something went wrong" 
            variant="outlined"
            className="error-card"
          >
            <div className="error-content">
              <p>We're sorry, but something unexpected happened.</p>
              <details>
                <summary>Error Details (for developers)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
              <div className="error-actions">
                <Button 
                  variant="primary" 
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => window.location.href = '/'}
                >
                  Go Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;