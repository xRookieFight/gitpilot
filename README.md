<div align="center" style="display:grid;place-items:center;">
<p>
    <img width="700" src="https://socialify.git.ci/xRookieFight/gitpilot/image?description=1&font=Inter&forks=1&issues=1%3Fraw%3Dtrue&logo=https%3A%2F%2Fgithub.com%2FxRookieFight%2Fgitpilot%2Fblob%2Fmaster%2F.github%2Flogo.png%3Fraw%3Dtrue&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Auto" alt="The GitPilot logo">
</p>
</div>
<div align="center" style="display:grid;place-items:center;">

<p>GitPilot is an intelligent GitHub automation tool that helps maintain open-source repositories automatically.</p>

</div>


## Features

- Automatically categorize issues
- Automatically label pull requests
- Auto review pull requests with AI suggestions
- Auto generate changelog from commits and PRs
- Auto generate release notes
- Auto close stale issues and pull requests
- Auto welcome new contributors
- Auto detect duplicate issues
- Auto assign reviewers

## Installation

npm install -g @xrookiefight/gitpilot

## Run with Docker

```bash
docker pull ghcr.io/xrookiefight/gitpilot:latest

docker run -d \
  --name gitpilot \
  -p 3000:3000 \
  -e GITHUB_TOKEN=your_token \
  -e OPENAI_API_KEY=your_key \
  ghcr.io/xrookiefight/gitpilot:latest
```

## Usage

gitpilot start
gitpilot analyze
gitpilot maintain

## Configuration

Create a `.gitpilot.yml` file in the root of your repository to customize the behavior of the bot.

## Contribution

Please check out the [contribution guide](./CONTRIBUTING.md).

## License

[MIT License](./LICENSE).