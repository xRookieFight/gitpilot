import { Webhooks } from '@octokit/webhooks';
import { TriageAgent } from '../ai/agents/triage';
import { ReviewAgent } from '../ai/agents/reviewer';
import { GitHubClient } from './client';

export class WebhookHandler {
  private webhooks: Webhooks;
  private triageAgent: TriageAgent;
  private reviewAgent: ReviewAgent;
  private githubClient: GitHubClient;

  constructor(githubClient: GitHubClient) {
  this.githubClient = githubClient;
  this.triageAgent = new TriageAgent();
  this.reviewAgent = new ReviewAgent();

  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  
  if (!secret) {
    throw new Error('MISSING_SECRET: GITHUB_WEBHOOK_SECRET must be defined in .env');
  }

  this.webhooks = new Webhooks({
    secret: secret,
  });

  this.initializeRoutes();
}

  private initializeRoutes(): void {
    this.webhooks.on('issues.opened', async ({ payload }) => {
      const label = await this.triageAgent.categorizeIssue(
        payload.issue.title,
        payload.issue.body || ''
      );

      await this.githubClient.addLabel(
        payload.repository.owner.login,
        payload.repository.name,
        payload.issue.number,
        [label]
      );
    });

    this.webhooks.on('pull_request.opened', async ({ payload }) => {
      const diff = await this.githubClient.getPullRequestDiff(
        payload.repository.owner.login,
        payload.repository.name,
        payload.pull_request.number
      );

      const reviewText = await this.reviewAgent.reviewDiff(
        diff,
        payload.pull_request.title
      );

      await this.githubClient.addComment(
        payload.repository.owner.login,
        payload.repository.name,
        payload.pull_request.number,
        reviewText
      );
    });
  }

  public getRouter() {
    return this.webhooks;
  }
}