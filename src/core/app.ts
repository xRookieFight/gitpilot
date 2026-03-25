import { GitHubClient } from '../github/client';
import { PluginRegistry } from '../plugins/registry';
import { ConfigLoader } from './config';
import { StalePlugin } from '../plugins/stale';
import { ReleasePlugin } from '../plugins/release';
import { GitPilotServer } from '../github/server';

export class GitPilotApp {
  private githubClient: GitHubClient;
  private pluginRegistry: PluginRegistry;
  private configLoader: ConfigLoader;
  private server: GitPilotServer;

  constructor() {
    this.githubClient = new GitHubClient();
    this.configLoader = new ConfigLoader();
    this.pluginRegistry = new PluginRegistry(this.githubClient);
    this.server = new GitPilotServer(this.githubClient);

    this.initializePlugins();
  }

  private initializePlugins(): void {
    const config = this.configLoader.load();
    
    this.pluginRegistry.register(new StalePlugin(this.githubClient, config));
    this.pluginRegistry.register(new ReleasePlugin(this.githubClient));
  }

  public async start(): Promise<void> {
    this.pluginRegistry.loadPlugins();
    const port = parseInt(process.env.PORT || '3000');
    this.server.listen(port);
  }

  public async analyze(): Promise<void> {
    const owner = process.env.REPO_OWNER || '';
    const repo = process.env.REPO_NAME || '';
    const issues = await this.githubClient.octokit.rest.issues.listForRepo({ owner, repo });
    console.log(`Repository Analysis: ${issues.data.length} open issues found.`);
  }

  public async maintain(): Promise<void> {
    await this.pluginRegistry.executeMaintenance();
    console.log('Maintenance cycle completed successfully.');
  }
}