import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from './TaskItem';
import { ThemeProvider } from '../../../contexts';

const mockTask = {
  id: 1,
  title: 'Test Task',
  completed: false,
  priority: 'medium',
  createdAt: '2024-01-01T00:00:00.000Z'
};

const mockProps = {
  task: mockTask,
  onToggle: jest.fn(),
  onDelete: jest.fn(),
  onUpdate: jest.fn(),
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('TaskItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task correctly', () => {
    renderWithTheme(<TaskItem {...mockProps} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TaskItem {...mockProps} />);
    
    await user.click(screen.getByRole('checkbox'));
    
    expect(mockProps.onToggle).toHaveBeenCalledWith(1);
  });

  test('enters edit mode on double click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TaskItem {...mockProps} />);
    
    await user.dblClick(screen.getByText('Test Task'));
    
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TaskItem {...mockProps} />);
    
    await user.click(screen.getByText('Delete'));
    
    expect(mockProps.onDelete).toHaveBeenCalledWith(1);
  });

  test('updates task when editing', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TaskItem {...mockProps} />);
    
    await user.dblClick(screen.getByText('Test Task'));
    
    const input = screen.getByDisplayValue('Test Task');
    await user.clear(input);
    await user.type(input, 'Updated Task');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockProps.onUpdate).toHaveBeenCalledWith(1, { title: 'Updated Task' });
  });

  test('shows completed state correctly', () => {
    const completedTask = { ...mockTask, completed: true };
    renderWithTheme(<TaskItem {...mockProps} task={completedTask} />);
    
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});