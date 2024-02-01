interface RequestOptions {
  method: string;
  headers: {
    'Content-Type': string;
    Authorization: string;
  };
  body?: string;
}

// Function to generate persona-specific instructions
const getPersonaInstructions = (persona: string | null): string => {
  switch (persona?.toLowerCase()) {
    case 'calm':
      return 'Please maintain a calm and composed tone in your responses.';
    case 'smart':
      return 'You are now interacting with the smart persona. Provide intelligent and insightful responses.';
    case 'educational':
      return 'This is the educational persona. Share knowledge and information in your responses.';
    case 'casual':
      return 'You are now in casual mode. Feel free to keep the conversation relaxed and informal.';
    default:
      return 'Interact on a neutral tone';
  }
};

// Main function to interact with the OpenAI API and get messages
export const getMessages = async (
  value: string,
  persona: string | null
): Promise<any> => {
  const personaInstructions = getPersonaInstructions(persona);

  const systemMessage = `You're now interacting with the ${
    persona ? persona.toLowerCase() : 'neutral'
  } persona. ${personaInstructions}`;

  // Configure the request options for the API call
  const requestOptions: RequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: systemMessage,
        },
        { role: 'user', content: value },
      ],
      model: 'gpt-3.5-turbo-0301',
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      requestOptions
    );

    // Check if the response from the API is successful
    // If not, parse the error details and throw an OpenAI-specific error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.choices[0].message;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};
