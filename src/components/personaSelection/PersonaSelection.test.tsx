import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonaSelection from './PersonaSelection';

describe('PersonaSelection component behavior', () => {
  it('should call the onSelect callback with the correct persona when a persona box is clicked', () => {
    // Mock the onSelect callback
    const mockOnSelect = jest.fn();

    // Render the component with the mock callback
    render(<PersonaSelection onSelect={mockOnSelect} />);

    // Find the persona boxes and click on one
    const personaBox = screen.getByText('Calm');
    fireEvent.click(personaBox);

    // Verify that the onSelect callback was called with the correct persona
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('Calm');
  });
});
