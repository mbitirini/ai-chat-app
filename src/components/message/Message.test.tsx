import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from './Message';

describe('Message component behavior', () => {
  it('should render a user message with the correct emoji and content', () => {
    // Render the component with a user role and string content
    render(
      <Message role='user' content='Hello, how are you?' persona='Smart' />
    );

    // Verify that the correct emoji and content are rendered
    const emojiElement = screen.getByText('👤');
    const contentElement = screen.getByText('Hello, how are you?');

    expect(emojiElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  it('should render an assistant message with the correct emoji and structured content', () => {
    // Render the component with an assistant role and structured content
    render(
      <Message
        role='assistant'
        content={{ role: 'assistant', content: 'I am doing well, thank you!' }}
        persona='Calm'
      />
    );

    // Verify that the correct emoji and content are rendered
    const emojiElement = screen.getByText('😌');
    const contentElement = screen.getByText('I am doing well, thank you!');

    expect(emojiElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });
});
