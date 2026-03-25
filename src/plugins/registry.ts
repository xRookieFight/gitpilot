import { eventBus, GitPilotEvents } from '../core/events';

export class PluginRegistry {
  public loadPlugins(): void {
    eventBus.on(GitPilotEvents.ISSUE_OPENED, async (payload) => {
      console.log(`Processing issue #${payload.issue.number}`);
    });
  }

  public async executeMaintenance(): Promise<void> {
    eventBus.emit(GitPilotEvents.MAINTENANCE_RUN);
  }
}