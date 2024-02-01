/**
 * PersonaSelection component: Allows the user to select an AI persona from predefined options.
 * Displays persona names and corresponding emojis for a visually intuitive selection process.
 * When a persona is clicked, the onSelect callback is triggered with the selected persona.
 *
 * @param {PersonaSelectionProps} onSelect - Callback function to handle persona selection.
 */

import React from 'react';
import styles from './PersonaSelection.module.css';

interface PersonaSelectionProps {
  onSelect: (persona: string) => void;
}

const PersonaSelection: React.FC<PersonaSelectionProps> = ({ onSelect }) => {
  const personas = ['Calm', 'Smart', 'Educational', 'Casual'];
  const personaEmojis = ['😌', '🤓', '👩‍🎓', '😎'];

  return (
    <div className={styles.personaSelectionContainer}>
      <p className={styles.personaTitle}>
        Select an AI Persona to get started:
      </p>
      <div className={styles.personaOptions}>
        {personas.map((persona, index) => (
          <div
            key={persona}
            className={styles.personaBox}
            onClick={() => onSelect(persona)}
          >
            <div className={styles.emoji} style={{ fontSize: '24px' }}>
              {personaEmojis[index]}
            </div>
            <div className={styles.personaText}>{persona}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaSelection;
