/**
 * Message component: Renders a chat message with an emoji, content and persona details.
 * Determines the appropriate emoji based on the role (user or assistant) and selected persona.
 * Handles both string and structured content to support different message formats.
 *
 * @param {MessageProps} role - Role of the message (assistant or user).
 * @param {MessageProps} content - Content of the message, which can be a string or a structured object.
 * @param {MessageProps} persona - Persona selected for the assistant (if applicable).
 */

import React from 'react';
import styles from './Message.module.css';

interface MessageProps {
  role: 'assistant' | 'user';
  content: string | { role: 'assistant' | 'user'; content: string };
  persona: string | null;
}

const Message: React.FC<MessageProps> = ({ role, content, persona }) => {
  /**
   * Determines the default emoji for the assistant based on the selected persona.
   * @returns {string} - Default emoji for the assistant.
   */
  function getDefaultAssistantEmoji(): string {
    if (role === 'assistant' && persona) {
      // Choose the correct emoji based on the selected persona
      switch (persona) {
        case 'Calm':
          return '😌';
        case 'Smart':
          return '🤓';
        case 'Educational':
          return '👩‍🎓';
        case 'Casual':
          return '😎';
        default:
          break;
      }
    }
    return '👤'; // Default assistant emoji if no persona is selected
  }

  let emoji = role === 'user' ? '👤' : getDefaultAssistantEmoji();

  return (
    <div className={styles.wrapper}>
      <div className={styles.emoji}>{emoji}</div>
      <div className={styles.content}>
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          <p>{content.content}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
