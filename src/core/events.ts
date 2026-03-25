import { EventEmitter } from 'events';

export const eventBus = new EventEmitter();

export enum GitPilotEvents {
  ISSUE_OPENED = 'issue.opened',
  PR_OPENED = 'pull_request.opened',
  MAINTENANCE_RUN = 'maintenance.run',
}