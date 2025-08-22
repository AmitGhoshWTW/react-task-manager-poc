import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

test('renders app with header and main content', () => {
  render(<App />);
  
  // Check if main elements are rendered
  expect(screen.getByText('Task Manager')).toBeInTheDocument();
  expect(screen.getByText('React Task Manager POC')).toBeInTheDocument();
  expect(screen.getByText('Add New Task')).toBeInTheDocument();
});

test('renders task statistics component', () => {
  render(<App />);
  
  expect(screen.getByText('Task Statistics')).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  
  expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument();
});