'use server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const generateChatResponse = async (message) => {
  // api call or other logic related to openai
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: message }
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  });
  console.log(response.choices[0].message);
  console.log(response);
  
  return 'awesome';
};