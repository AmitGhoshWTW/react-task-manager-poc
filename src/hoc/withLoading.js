import React from 'react';
import { LoadingSpinner } from '../components/common';

export const withLoading = (WrappedComponent) => {
  const WithLoadingComponent = ({ isLoading, ...props }) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return <WrappedComponent {...props} />;
  };

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithLoadingComponent;
};