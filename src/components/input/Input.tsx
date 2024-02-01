/**
 * Input component: Renders an input field for typing messages with a send button.
 * Handles value changes, Enter key press and click events for submitting messages.
 *
 * @param {InputProps} value - Current value of the input field.
 * @param {InputProps} onChange - Callback for handling input value changes.
 * @param {InputProps} onSubmit - Callback for submitting the input message.
 */

import React from 'react';
import styles from './Input.module.css';
import sendbutton from '../../icons/sendbutton.svg';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const Input: React.FC<InputProps> = ({ value, onChange, onSubmit }) => {
  /**
   * Handles Enter key press in the input field to trigger message submission.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.text}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='Start typing here...'
      />
      <div id='submit' onClick={onSubmit} className={styles.btn}>
        <img src={sendbutton} alt='Send' />
      </div>
    </div>
  );
};

export default Input;
