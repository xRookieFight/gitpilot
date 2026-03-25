import { StalePlugin } from '../stale';
import { GitHubClient } from '../../github/client';
import { GitPilotConfig } from '../../core/config';

describe('StalePlugin', () => {
  let mockClient: jest.Mocked<GitHubClient>;
  let mockConfig: GitPilotConfig;

  beforeEach(() => {
    mockClient = {
      getStaleIssues: jest.fn().mockResolvedValue({ data: { items: [{ number: 1 }] } }),
      addComment: jest.fn().mockResolvedValue({}),
    } as any;

    mockConfig = {
      version: '1.0',
      features: {
        auto_label: true,
        auto_review: true,
        welcome_message: 'hi',
        stale: { days_until_stale: 30, days_until_close: 7 }
      }
    };
  });

  it('should identify and comment on stale issues', async () => {
    const plugin = new StalePlugin(mockClient, mockConfig);
    await plugin.onMaintain();

    expect(mockClient.getStaleIssues).toHaveBeenCalled();
    expect(mockClient.addComment).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      1,
      expect.stringContaining('stale')
    );
  });
});