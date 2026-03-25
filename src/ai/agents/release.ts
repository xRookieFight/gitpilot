import { AIProvider } from '../provider';

export class ReleaseAgent {
  private ai: AIProvider;

  constructor() {
    this.ai = new AIProvider();
  }

  public async generateChangelog(commits: string[]): Promise<string> {
    const systemContext = "You are a release manager. Group the following commit messages into a clean, readable Markdown changelog. Group them by Features, Bug Fixes, and Maintenance. Discard meaningless commits like 'fix typos'.";
    const prompt = `Commits:\n${commits.join('\n')}`;
    
    return await this.ai.generateResponse(prompt, systemContext);
  }
}