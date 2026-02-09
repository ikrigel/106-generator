import React, { ReactNode } from 'react';
import { Alert } from '../ui/Alert';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white dark:bg-slate-950 p-4">
          <div className="mx-auto max-w-md pt-20">
            <Alert
              type="error"
              title="Something went wrong"
              message={this.state.error?.message || 'An unexpected error occurred'}
            />
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mt-4 w-full"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
