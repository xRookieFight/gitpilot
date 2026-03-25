import { AIProvider } from '../provider';

export class DeduplicationAgent {
  private ai: AIProvider;

  constructor() {
    this.ai = new AIProvider();
  }

  public async checkSimilarity(newIssue: string, existingIssues: string[]): Promise<{ isDuplicate: boolean; duplicateId?: string }> {
    const systemContext = "You are a technical analyst. Compare the new issue description against a list of existing issues. Determine if any existing issue describes the same technical problem. Return a JSON object: { 'isDuplicate': boolean, 'duplicateId': string | null }.";
    
    const prompt = `New Issue: ${newIssue}\n\nExisting Issues:\n${existingIssues.join('\n')}`;
    const response = await this.ai.generateResponse(prompt, systemContext);
    
    try {
      return JSON.parse(response);
    } catch {
      return { isDuplicate: false };
    }
  }
}