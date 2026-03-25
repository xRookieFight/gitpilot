import { GitHubClient } from '../github/client';

export interface GitPilotPlugin {
  name: string;
  onEvent?: (eventName: string, payload: any) => Promise<void>;
  onMaintain?: () => Promise<void>;
}

export class PluginRegistry {
  private plugins: GitPilotPlugin[] = [];
  private githubClient: GitHubClient;

  constructor(githubClient: GitHubClient) {
    this.githubClient = githubClient;
  }

  public register(plugin: GitPilotPlugin): void {
    this.plugins.push(plugin);
  }

  public loadPlugins(): void {
    console.log(`Loaded ${this.plugins.length} plugins.`);
  }

  public async executeMaintenance(): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.onMaintain) {
        await plugin.onMaintain();
      }
    }
  }
}