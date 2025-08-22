import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  test('renders card with title and children', () => {
    render(
      <Card title="Test Card">
        <p>Card content</p>
      </Card>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders card with subtitle', () => {
    render(
      <Card title="Test Card" subtitle="Test Subtitle">
        Content
      </Card>
    );
    
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('renders card with image', () => {
    render(
      <Card title="Test Card" image="https://example.com/image.jpg">
        Content
      </Card>
    );
    
    const image = screen.getByAltText('Test Card');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders card with actions', () => {
    const actions = <button>Action Button</button>;
    
    render(
      <Card title="Test Card" actions={actions}>
        Content
      </Card>
    );
    
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Card variant="outlined">Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('outlined');

    rerender(<Card variant="elevated">Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('elevated');
  });

  test('applies hoverable effect', () => {
    render(<Card hoverable>Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('hoverable');
  });

  test('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText('Content').closest('.card')).toHaveClass('custom-class');
  });
});