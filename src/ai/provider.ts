import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export class AIProvider {
  private model: any;

  constructor() {
    this.model = openai('gpt-4-turbo');
  }

  public async generateResponse(prompt: string, systemContext: string): Promise<string> {
    const { text } = await generateText({
      model: this.model,
      system: systemContext,
      prompt: prompt,
    });
    
    return text;
  }
}