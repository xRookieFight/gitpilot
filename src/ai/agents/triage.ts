import { AIProvider } from '../provider';

export class TriageAgent {
  private ai: AIProvider;

  constructor() {
    this.ai = new AIProvider();
  }

  public async categorizeIssue(title: string, body: string): Promise<string> {
    const systemContext = "You are an expert GitHub issue triage agent. Categorize the issue as 'bug', 'enhancement', 'question', or 'docs'. Return only the exact category name in lowercase without any additional text or formatting.";
    const prompt = `Title: ${title}\nBody: ${body}`;
    
    const result = await this.ai.generateResponse(prompt, systemContext);
    
    return result.trim().toLowerCase();
  }
}