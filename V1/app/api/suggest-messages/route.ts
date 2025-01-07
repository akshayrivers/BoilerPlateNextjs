import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const runtime ='edge';

export async function POST(req: Request) {
    const { messages } = await req.json();
  
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: "Create a list of three open-ended and engaging questions formatted as a single string which are suitable for a conversation with a friend.",
    });
  
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }