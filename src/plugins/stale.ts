import { GitPilotPlugin } from './registry';
import { GitHubClient } from '../github/client';
import { GitPilotConfig } from '../core/config';

export class StalePlugin implements GitPilotPlugin {
  public name = 'stale-manager';
  private githubClient: GitHubClient;
  private config: GitPilotConfig;

  constructor(githubClient: GitHubClient, config: GitPilotConfig) {
    this.githubClient = githubClient;
    this.config = config;
  }

  public async onMaintain(): Promise<void> {
    const owner = process.env.REPO_OWNER || '';
    const repo = process.env.REPO_NAME || '';

    const staleIssues = await this.githubClient.getStaleIssues(
      owner,
      repo,
      this.config.features.stale.days_until_stale
    );

    for (const issue of staleIssues.data.items) {
      await this.githubClient.addComment(
        owner,
        repo,
        issue.number,
        'This issue is marked as stale because it has had no activity.'
      );
    }
  }
}