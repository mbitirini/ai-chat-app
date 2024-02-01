/**
 * NewChatButton component: Renders a button to create a new chat.
 * Invokes the provided onClick callback when the button is clicked.
 *
 * @param {NewChatButtonProps} onClick - Callback function triggered on button click.
 */

import React, { MouseEvent } from 'react';
import styles from './NewChatButton.module.css';

interface NewChatButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.centered}>
      <button className={styles.wrapper} onClick={onClick}>
        + New Chat
      </button>
    </div>
  );
};

export default NewChatButton;
