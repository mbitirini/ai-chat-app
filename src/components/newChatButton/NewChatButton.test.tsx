import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewChatButton from './NewChatButton';

describe('NewChatButton component behavior', () => {
  it('should call the onClick callback with the correct event when the button is clicked', () => {
    // Mock the onClick callback
    const mockOnClick = jest.fn();

    // Render the component with the mock callback
    render(<NewChatButton onClick={mockOnClick} />);

    // Find the button element and click it
    const buttonElement = screen.getByRole('button', { name: '+ New Chat' });
    fireEvent.click(buttonElement);

    // Verify that the onClick callback was called with the correct event
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' })
    );
  });
});
