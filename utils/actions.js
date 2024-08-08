'use server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});


export const generateChatResponse = async (message) => {
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