import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

export interface GitPilotConfig {
  version: string;
  features: {
    auto_label: boolean;
    auto_review: boolean;
    welcome_message: string;
    stale: {
      days_until_stale: number;
      days_until_close: number;
    };
  };
}

export class ConfigLoader {
  private configPath: string;

  constructor() {
    this.configPath = path.join(process.cwd(), '.gitpilot.yml');
  }

  public load(): GitPilotConfig {
    if (!fs.existsSync(this.configPath)) {
      return this.getDefaults();
    }

    const fileContents = fs.readFileSync(this.configPath, 'utf8');
    return parse(fileContents) as GitPilotConfig;
  }

  private getDefaults(): GitPilotConfig {
    return {
      version: '1.0',
      features: {
        auto_label: true,
        auto_review: true,
        welcome_message: 'Thanks for opening an issue!',
        stale: {
          days_until_stale: 60,
          days_until_close: 7,
        },
      },
    };
  }
}