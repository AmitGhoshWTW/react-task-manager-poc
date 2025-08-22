import { useState, useEffect, useCallback, useRef } from 'react';

export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenRef = useRef();

  const {
    immediate = false,
    onSuccess,
    onError,
    transform
  } = options;

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      // Cancel previous request if exists
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('New request initiated');
      }

      const result = await apiFunction(...args);
      const transformedData = transform ? transform(result.data) : result.data;
      
      setData(transformedData);
      onSuccess?.(transformedData);
      
      return transformedData;
    } catch (err) {
      if (err.name !== 'CancelledError') {
        setError(err);
        onError?.(err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, transform, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    retry
  };
};

// Specialized hooks
export const useUsers = () => {
  return useApi(
    () => import('../services/api').then(({ apiService }) => apiService.getUsers()),
    [],
    { 
      immediate: true,
      transform: (data) => data.slice(0, 5) // Limit for demo
    }
  );
};

export const usePosts = () => {
  return useApi(
    () => import('../services/api').then(({ apiService }) => apiService.getPosts()),
    [],
    { 
      immediate: true,
      transform: (data) => data.slice(0, 10)
    }
  );
};