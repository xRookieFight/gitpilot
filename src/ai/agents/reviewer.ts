import { AIProvider } from '../provider';

export class ReviewAgent {
  private ai: AIProvider;

  constructor() {
    this.ai = new AIProvider();
  }

  public async reviewDiff(diff: string, title: string): Promise<string> {
    const systemContext = "You are a strict but helpful senior software engineer reviewing a pull request. Provide concise, actionable feedback on the following code diff. Focus on bugs, security vulnerabilities, and performance bottlenecks. Output the response in standard GitHub markdown format.";
    const prompt = `PR Title: ${title}\nDiff to review:\n${diff}`;
    
    return await this.ai.generateResponse(prompt, systemContext);
  }
}