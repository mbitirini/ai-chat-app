/**
 * Represents a chat item with title, role, content and persona details.
 */
interface ChatItem {
  title: string;
  role: 'user' | 'assistant';
  content: string;
  persona: string | null;
}

/**
 * Retrieves stored chat history from local storage.
 *
 * @returns {ChatItem[]} - An array of chat items retrieved from local storage.
 */
export const getStoredChats = (): ChatItem[] => {
  try {
    // Attempt to parse and retrieve stored chats from local storage
    const storedChats = JSON.parse(
      localStorage.getItem('chatHistory') || '[]'
    ) as ChatItem[];
    // Ensure the retrieved data is an array, returning an empty array if not
    return Array.isArray(storedChats) ? storedChats : [];
  } catch (error) {
    console.error('Error parsing stored chats:', error);
    // Return an empty array in case of an error during parsing or retrieval
    return [];
  }
};

/**
 * Sets the provided array of chat items as the new chat history in local storage.
 *
 * @param {ChatItem[]} chats - An array of chat items to be stored in local storage.
 */
export const setStoredChats = (chats: ChatItem[]): void => {
  try {
    // Stringify and store the provided chat items in local storage
    localStorage.setItem('chatHistory', JSON.stringify(chats));
  } catch (error) {
    console.error('Error storing chats in localStorage:', error);
  }
};
