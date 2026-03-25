import { Octokit } from 'octokit';

export const rateLimitPlugin = (octokit: Octokit) => {
  octokit.hook.after('request', async (response, options) => {
    const remaining = response.headers['x-ratelimit-remaining'];
    if (remaining && parseInt(remaining) < 10) {
      console.warn('GitHub API Rate limit nearly exhausted.');
    }
  });

  octokit.hook.error('request', async (error: any, options) => {
    if (error.status === 403 && error.headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(parseInt(error.headers['x-ratelimit-reset']) * 1000);
      console.error(`Rate limit hit. Resets at ${resetTime.toISOString()}`);
    }
    throw error;
  });
};