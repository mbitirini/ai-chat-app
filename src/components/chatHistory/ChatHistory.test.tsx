import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatHistory from './ChatHistory';

describe('ChatHistory component', () => {
  const uniqueTitles = ['Chat 1', 'Chat 2', 'Chat 3'];
  const handleClick = jest.fn();
  const onDelete = jest.fn();
  const displayedChat = 'Chat 1';

  it('should render chat history items', () => {
    render(
      <ChatHistory
        uniqueTitles={uniqueTitles}
        handleClick={handleClick}
        onDelete={onDelete}
        displayedChat={displayedChat}
      />
    );

    // Check if each chat title is rendered
    uniqueTitles.forEach((title) => {
      const chatItem = screen.getByText(title);
      expect(chatItem).toBeInTheDocument();
    });
  });

  it('should handle click events on chat history items', () => {
    render(
      <ChatHistory
        uniqueTitles={uniqueTitles}
        handleClick={handleClick}
        onDelete={onDelete}
        displayedChat={displayedChat}
      />
    );

    // Click on a chat history item
    const chatItem = screen.getByText('Chat 2');
    fireEvent.click(chatItem);

    // Verify that the handleClick callback was called with the correct title
    expect(handleClick).toHaveBeenCalledWith('Chat 2');
  });

  it('should handle delete click events on the currently displayed chat', () => {
    render(
      <ChatHistory
        uniqueTitles={uniqueTitles}
        handleClick={handleClick}
        onDelete={onDelete}
        displayedChat={displayedChat}
      />
    );

    // Click on the delete icon of the currently displayed chat
    const deleteIcon = screen.getByAltText('Trash Can');
    fireEvent.click(deleteIcon);

    // Verify that the onDelete callback was called with the correct title
    expect(onDelete).toHaveBeenCalledWith('Chat 1');
  });
});
