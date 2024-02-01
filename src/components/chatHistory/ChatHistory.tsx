/**
 * ChatHistory component: Displays a list of unique chat titles with options to select and delete.
 * Highlights the selected or hovered chat item for better user feedback.
 * Provides a delete option for the currently displayed chat.
 *
 * @param {HistoryProps} uniqueTitles - List of unique chat titles.
 * @param {HistoryProps} handleClick - Callback for handling the selection of a chat.
 * @param {HistoryProps} onDelete - Callback for handling the deletion of a chat.
 * @param {HistoryProps} displayedChat - Currently displayed chat title.
 */

import React, { useState } from 'react';
import styles from './ChatHistory.module.css';
import trashIcon from '../../icons/red-trash-can.svg';

interface HistoryProps {
  uniqueTitles: string[] | undefined;
  handleClick: (uniqueTitle: string) => void;
  onDelete: (uniqueTitle: string) => void;
  displayedChat: string | null;
}

const History: React.FC<HistoryProps> = ({
  uniqueTitles,
  handleClick,
  onDelete,
  displayedChat,
}) => {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  return (
    <div className={styles.historyWrapper}>
      {uniqueTitles?.map((uniqueTitle, index) => (
        <div
          key={index}
          className={`${styles.historyItem} ${
            displayedChat === uniqueTitle || hoveredChat === uniqueTitle
              ? styles.selectedChat
              : ''
          }`}
          onClick={() => handleClick(uniqueTitle)}
          onMouseEnter={() => setHoveredChat(uniqueTitle)}
          onMouseLeave={() => setHoveredChat(null)}
        >
          <p>
            {uniqueTitle.length > 18
              ? `${uniqueTitle.substring(0, 18)}..`
              : uniqueTitle}
          </p>
          {displayedChat === uniqueTitle && (
            <div
              className={styles.binIcon}
              onClick={(e) => {
                // e.stopPropagation(); // Prevent the click event from reaching the history item
                onDelete(uniqueTitle);
              }}
            >
              <img
                src={trashIcon}
                alt='Trash Can'
                className={styles.trashIcon}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
