import { GitPilotPlugin } from './registry';
import { GitHubClient } from '../github/client';
import { ReleaseAgent } from '../ai/agents/release';

export class ReleasePlugin implements GitPilotPlugin {
  public name = 'release-generator';
  private githubClient: GitHubClient;
  private releaseAgent: ReleaseAgent;

  constructor(githubClient: GitHubClient) {
    this.githubClient = githubClient;
    this.releaseAgent = new ReleaseAgent();
  }

  public async onMaintain(): Promise<void> {
    const owner = process.env.REPO_OWNER || '';
    const repo = process.env.REPO_NAME || '';

    const commits = await this.githubClient.octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 20
    });

    const commitMessages = commits.data.map((c: any) => c.commit.message);
    const changelog = await this.releaseAgent.generateChangelog(commitMessages);

    await this.githubClient.octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: `v${Date.now()}`,
      name: `Auto Release ${new Date().toLocaleDateString()}`,
      body: changelog,
      draft: true
    });
  }
}