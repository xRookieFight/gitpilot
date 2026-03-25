import { GitPilotPlugin } from './registry';
import { GitHubClient } from '../github/client';

export class WelcomePlugin implements GitPilotPlugin {
  public name = 'welcome-agent';
  private githubClient: GitHubClient;

  constructor(githubClient: GitHubClient) {
    this.githubClient = githubClient;
  }

  public async onEvent(eventName: string, payload: any): Promise<void> {
    if (eventName !== 'issues.opened' && eventName !== 'pull_request.opened') return;

    const { owner, repo } = { 
      owner: payload.repository.owner.login, 
      repo: payload.repository.name 
    };
    const username = payload.sender.login;

    const octokit = await this.githubClient.getInstallationClient(payload.installation.id);
    
    const { data: userIssues } = await octokit.rest.search.issuesAndPullRequests({
      q: `repo:${owner}/${repo} author:${username}`,
    });

    if (userIssues.total_count === 1) {
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: payload.issue?.number || payload.pull_request?.number,
        body: `Welcome @${username}! Thank you for making your first contribution to ${repo}.`,
      });
    }
  }
}