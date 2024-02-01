import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NewChatButton from './components/newChatButton/NewChatButton';
import ChatHistory from './components/chatHistory/ChatHistory';
import ChatFeed from './components/chatFeed/ChatFeed';
import Input from './components/input/Input';
import PersonaSelection from './components/personaSelection/PersonaSelection';
import { getMessages } from './services/apiService';
import { getStoredChats, setStoredChats } from './utils/localStorageUtils';

// Define the structure of a chat item
interface ChatItem {
  title: string;
  role: 'user' | 'assistant';
  content: string;
  persona: string | null;
}

// Main App Component
const App: React.FC = () => {
  // UI-related state
  const [value, setValue] = useState<string>('');
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [displayedChat, setDisplayedChat] = useState<string | null>(null);

  // Data-related state
  const [message, setMessage] = useState<ChatItem | null>(null);
  const [previousChats, setPreviousChats] = useState<ChatItem[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [deletionTriggered, setDeletionTriggered] = useState<boolean>(false);

  // Ref for accessing the app container
  // no need to use this one
  // const appContainerRef = useRef<HTMLDivElement | null>(null);

  // Ref to track whether the message request is triggered by a user action
  const isUserAction = useRef(false);

  // UI-related functions

  /**
   * Creates a new chat, resetting relevant state variables.
   */
  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
    setSelectedPersona(null);
    setIsNewChat(true);
    setIsSidebarVisible(false);
  };

  /**
   * Handles the click on a chat item, setting up the state for the selected chat.
   *
   * @param {string} uniqueTitle - The unique title of the clicked chat.
   */
  const handleClick = (uniqueTitle: string) => {
    const selectedChat = previousChats.find(
      (chat) => chat.title === uniqueTitle
    );

    if (selectedChat) {
      setCurrentTitle(uniqueTitle);
      setMessage(null);
      setValue('');
      setIsNewChat(false);
      setIsSidebarVisible(false);

      // Update selectedPersona based on the selected chat's persona
      setSelectedPersona(selectedChat.persona);
    }
  };

  /**
   * Toggles the visibility of the sidebar.
   */
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  /**
   * Filters the current chat based on the selected title.
   */
  const currentChat = previousChats.filter(
    (chat) => chat.title === currentTitle
  );

  /**
   * Extracts unique chat titles from the list of previous chats.
   */
  const uniqueTitles = Array.from(
    new Set(previousChats.map((chat) => chat.title))
  );

  // Effect to update the displayed chat based on the currentTitle and isNewChat
  useEffect(() => {
    // Set the displayed chat based on the currentTitle
    setDisplayedChat(currentTitle);
  }, [currentTitle]);

  // Data-related functions

  /**
   * Deletes the chat history for a specific title.
   *
   * @param {string} uniqueTitle - The unique title of the chat to be deleted.
   */
  const deleteHistory = (uniqueTitle: string) => {
    const updatedChats = previousChats.filter(
      (chat) => chat.title !== uniqueTitle
    );

    // Update the state with the modified chat history
    setPreviousChats(updatedChats);

    // Save the updated chat history to localStorage
    setStoredChats(updatedChats);

    // Set deletionTriggered to true
    setDeletionTriggered(true);
  };

  // Effect to handle document clicks outside the sidebar for closing it
  useEffect(() => {
    // Function to handle document clicks
    const handleDocumentClick = (event: MouseEvent) => {
      const sidebar = document.querySelector('.sideBar');
      // Close the sidebar if it's visible and the click is outside it
      if (
        isSidebarVisible &&
        sidebar &&
        !sidebar.contains(event.target as Node)
      ) {
        setIsSidebarVisible(false);
      }
    };
    // Add the event listener on component mount
    document.addEventListener('mousedown', handleDocumentClick);

    // Remove the event listener on component unmount -- cleanup function
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isSidebarVisible]);

  // Effect to retrieve chat history from local storage on component mount
  useEffect(() => {
    const storedChats = getStoredChats();
    // Set the initial chat history state
    setPreviousChats(storedChats);
  }, []);

  // Effect to handle deletion triggered state changes
  useEffect(() => {
    // Reset state variables related to the current chat and persona when deletion is triggered
    if (deletionTriggered) {
      setCurrentTitle(null);
      setSelectedPersona(null);
      setIsNewChat(true);

      // Reset the deletionTriggered state
      setDeletionTriggered(false);
    }
  }, [deletionTriggered]);

  /**
   * Handles the request to fetch messages and updates the state accordingly.
   */
  const handleMessageRequest = async () => {
    try {
      isUserAction.current = true;
      const response = await getMessages(value, selectedPersona);
      setMessage(response);
    } catch (error) {
      console.error('An error occurred while fetching messages:', error);
    }
  };

  /*
   * Effect: Manages chat history based on user interactions
   *
   * This effect is crucial for handling chat history in response to user interactions:
   * - If there is no existing chat session (currentTitle is null) and a message is received:
   *   - Generate a new title based on the entered value, ensuring uniqueness among existing titles.
   *   - Set the new title as the currentTitle, initiating a new chat session.
   * - If there is an existing chat session (currentTitle exists) and a user sends a message:
   *   - Add the user's message and the assistant's response to the chat history.
   *   - Save the updated chat history to localStorage for persistence across sessions.
   *   - Update the state to trigger a re-render, displaying the new messages.
   *   - Reset the input value to prepare for the next user input.
   *
   */
  useEffect(() => {
    // Check if there's no current chat and there's a value and a message
    if (!currentTitle && value && message && isUserAction.current) {
      let newTitle = value;

      // If the title already exists, add a suffix to create a new title
      // this could go outside
      if (uniqueTitles.includes(newTitle)) {
        let suffix = 1;
        newTitle = `${value} ${suffix}`;

        // Generate a new title until a unique one is found
        while (uniqueTitles.includes(newTitle)) {
          suffix += 1;
          newTitle = `${value} ${suffix}`;
        }
      }
      // Set the new title as the currentTitle
      setCurrentTitle(newTitle);
    }

    // Check if there's a current title, value, and a message
    if (currentTitle && value && message && isUserAction.current) {
      // Create a new array with the updated chat history
      const newChats: ChatItem[] = [
        ...previousChats,
        {
          title: currentTitle,
          role: 'user',
          content: value,
          persona: selectedPersona,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
          persona: selectedPersona,
        },
      ];

      // Save the updated chat history to localStorage
      localStorage.setItem('chatHistory', JSON.stringify(newChats));

      // Update state to trigger re-render
      setPreviousChats(newChats);
      setValue('');
      // This flag helps in preventing unnecessary state updates and ensures that the state is only updated in response to user actions
      // avoiding potential conflicts or unwanted side effects.
      isUserAction.current = false;
    }
  }, [
    message,
    currentTitle,
    value,
    uniqueTitles,
    previousChats,
    selectedPersona,
  ]);

  return (
    <div className='App'>
      <div className='header'>
        <div className='burgerButton' onClick={toggleSidebar}>
          ☰
        </div>
      </div>
      <section className={`sideBar ${isSidebarVisible ? 'visible' : ''}`}>
        <NewChatButton onClick={createNewChat} />
        <ChatHistory
          uniqueTitles={uniqueTitles}
          handleClick={handleClick}
          onDelete={deleteHistory}
          displayedChat={displayedChat}
        />
      </section>
      <section className='mainBar'>
        {isNewChat && !selectedPersona && (
          <PersonaSelection
            onSelect={(persona) => setSelectedPersona(persona)}
          />
        )}
        {((isNewChat && selectedPersona) || currentTitle) && (
          <>
            <ChatFeed currentChat={currentChat} />
            <Input
              value={value}
              onChange={(newValue) => setValue(newValue)}
              onSubmit={handleMessageRequest}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default App;
