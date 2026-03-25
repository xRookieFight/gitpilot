import express from 'express';
import { createNodeMiddleware } from '@octokit/webhooks';
import { WebhookHandler } from './webhooks';
import { GitHubClient } from './client';

export class GitPilotServer {
  private app: express.Application;
  private handler: WebhookHandler;

  constructor(githubClient: GitHubClient) {
    this.app = express();
    this.handler = new WebhookHandler(githubClient);
    this.setupMiddleware();
  }

  private setupMiddleware(): void {
    this.app.use('/webhooks', createNodeMiddleware(this.handler.getRouter() as any));
  }

  public listen(port: number = 3000): void {
    this.app.listen(port, () => {
      console.log(`GitPilot Webhook Server listening on port ${port}`);
    });
  }
}