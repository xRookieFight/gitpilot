import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';

export class GitHubClient {
  public octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  }

  public async getInstallationClient(installationId: string): Promise<Octokit> {
    return new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GITHUB_APP_ID || '',
        privateKey: (process.env.GITHUB_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        installationId: installationId,
      },
    });
  }

  public async addLabel(owner: string, repo: string, issueNumber: number, labels: string[]) {
    return this.octokit.rest.issues.addLabels({ owner, repo, issue_number: issueNumber, labels });
  }

  public async addComment(owner: string, repo: string, issueNumber: number, body: string) {
    return this.octokit.rest.issues.createComment({ owner, repo, issue_number: issueNumber, body });
  }

  public async getPullRequestDiff(owner: string, repo: string, pullNumber: number): Promise<string> {
    const response = await this.octokit.rest.pulls.get({
      owner, repo, pull_number: pullNumber,
      headers: { accept: 'application/vnd.github.v3.diff' },
    });
    return response.data as unknown as string;
  }

  public async getStaleIssues(owner: string, repo: string, days: number) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    const dateString = date.toISOString().split('T')[0];
    const q = `repo:${owner}/${repo} is:issue is:open updated:<${dateString}`;
    return this.octokit.rest.search.issuesAndPullRequests({ q });
  }
}