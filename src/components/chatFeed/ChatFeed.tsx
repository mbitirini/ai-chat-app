/**
 * ChatFeed component: Displays a feed of chat messages using the Message component.
 * Maps over the currentChat array to render individual Message components.
 *
 * @param {ChatFeedProps} currentChat - Array of chat items to be displayed in the feed.
 */

import React from 'react';
import Message from '../message/Message';
import styles from './ChatFeed.module.css';

interface ChatItem {
  title: string;
  role: 'user' | 'assistant';
  content: string;
  persona: string | null;
}

interface ChatFeedProps {
  currentChat: ChatItem[];
}

const ChatFeed: React.FC<ChatFeedProps> = ({ currentChat }) => {
  return (
    <div className={styles.feed}>
      {currentChat.map((chatMessage, index) => (
        <Message
          key={index}
          role={chatMessage.role}
          content={chatMessage.content}
          persona={chatMessage.persona}
        />
      ))}
    </div>
  );
};

export default ChatFeed;
