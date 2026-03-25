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
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use('/webhooks', createNodeMiddleware(this.handler.getRouter() as any));
  }

  private setupRoutes(): void {
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    });
  }

  public listen(port: number = 3000): void {
    this.app.listen(port, () => {
      console.log(`GitPilot Server listening on port ${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
    });
  }
}