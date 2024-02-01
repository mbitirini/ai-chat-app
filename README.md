# My OpenAI-Chat App

Welcome to My OpenAI-Chat App! This React application allows you to chat and manage your chat history, with the help of AI ✨🌟✨

## Table of Contents

- [Installation](#installation)
- [Usage](#testing)
- [Project Details](#project-details)
- [Notes](#notes)

## Installation

Follow these steps to set up and run the application on your local machine:

1. **Clone the Repository**
2. **Install Dependencies:**

```bash
npm install
```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the project and add this necessary environment variable.

```bash
REACT_APP_OPENAI_API_KEY=your_api_key
```

where `your_api_key` is the OpenAI API key

4. **Start the Development Server:**

```bash
npm start
```

## Testing

Once the development server is running, open your browser and navigate to `http://localhost:3000` to use the application. You can create new chats, select personas and interact with the chat interface.

**Create a new chat:**

- Click the New Chat Button.
- Select the desired persona to talk with.
- Write the message you want to send in the input box.
- Send the message by either pressing enter or clicking the send button.
- Have fun! 🥳

https://github.com/mbitirini/siena-frontend-task/assets/69593342/514d6bed-066e-4e02-8ff5-d81787570206

**Navigate through your chat history:**

- Check your previous chat history in the sidebar on the left side of the screen.
- To delete a chat, click on that chat, and a bin icon appears. Click that icon to delete the chat.
- When you delete a chat, you are automatically taken back to the "Start New Chat" state.
- You can then select a persona and create a new chat or click on one based on your chat history.

https://github.com/mbitirini/siena-frontend-task/assets/69593342/fdc71b7c-c09a-4e05-a4a0-25ac27d78538

## Project details

### Planning Features and UI

The application is written with React and TypeScript, I use OpenAI API to access the data and use CSS modules for styling.

**Code structure:**

```bash
/src
  /components
    /chatfeed
      - ChatFeed.tsx
      - ChatFeed.module.css
    /input
      - Input.tsx
      - Input.module.css
      - Input.test.tsx
    /message
      - Message.tsx
      - Message.module.css
      - Message.test.tsx
    /chatHistory
      - ChatHistory.tsx
      - ChatHistory.module.css
      - ChatHistory.test.tsx
    /newChatButton
      - NewChatButton.tsx
      - NewChatButton.module.css
      - NewChatButton.test.tsx
    /personaSelection
      - PersonaSelection.tsx
      - PersonaSelection.module.css
      - PersonaSelection.test.tsx
  - App.tsx
  - index.tsx
  /services
    - apiService.ts
  /utils
    - localStorageUtils.ts
  /icons


```

### Responsiveness and UI

**Desktop Version:**

1. The application is optimized for desktop screens, providing a user-friendly interface.
2. The side menu includes options such as the "New Chat" button and chat history.

**Mobile Version:**

1. A simplified version is available for tablet and mobile screens to enhance user experience.
2. A hamburger button is provided to access the side menu, containing the "New Chat" button and chat history.
3. Clicking outside the menu automatically closes it for a seamless interaction.
