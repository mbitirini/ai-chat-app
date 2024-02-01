import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component behavior', () => {
  it('should render input field and submit button', () => {
    // Render the component
    render(<Input value='' onChange={() => {}} onSubmit={() => {}} />);

    // Verify the existence of the input field and submit button
    const inputElement = screen.getByPlaceholderText('Start typing here...');
    const submitButtonElement = screen.getByAltText('Send');

    expect(inputElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();
  });

  it('should update the input value on change', () => {
    // Mock the onChange callback
    const mockOnChange = jest.fn();

    // Render the component with the mock callback
    render(<Input value='' onChange={mockOnChange} onSubmit={() => {}} />);

    // Find the input field and change its value
    const inputElement = screen.getByPlaceholderText('Start typing here...');
    fireEvent.change(inputElement, { target: { value: 'Hello, World!' } });

    // Verify that the onChange callback was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('Hello, World!');
  });

  it('should submit the input value on Enter key press', () => {
    // Mock the onSubmit callback
    const mockOnSubmit = jest.fn();

    // Render the component with the mock callback
    render(
      <Input
        value='Hello, World!'
        onChange={() => {}}
        onSubmit={mockOnSubmit}
      />
    );

    // Find the input field and simulate an Enter key press
    const inputElement = screen.getByPlaceholderText('Start typing here...');
    fireEvent.keyPress(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // Verify that the onSubmit callback was called
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should submit the input value on button click', () => {
    // Mock the onSubmit callback
    const mockOnSubmit = jest.fn();

    // Render the component with the mock callback
    render(
      <Input
        value='Hello, World!'
        onChange={() => {}}
        onSubmit={mockOnSubmit}
      />
    );

    // Find the submit button and click it
    const submitButtonElement = screen.getByAltText('Send');
    fireEvent.click(submitButtonElement);

    // Verify that the onSubmit callback was called
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
