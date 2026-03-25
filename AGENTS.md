# GitPilot AI Agents Architecture

GitPilot leverages a multi-agent AI system to automate repository maintenance tasks. Each agent is designed with a specific system prompt and bounded context to ensure reliable and focused execution.

## Core Agents

### 1. Triage Agent
- **Purpose**: Automatically categorizes incoming issues.
- **Inputs**: Issue title, issue body, repository context.
- **Outputs**: Label strings (e.g., bug, enhancement, question, documentation).
- **Trigger**: `issues.opened`, `issues.edited`

### 2. Review Agent
- **Purpose**: Analyzes pull request diffs to provide actionable code quality suggestions.
- **Inputs**: PR diff, PR title, PR description.
- **Outputs**: Markdown-formatted review comments.
- **Trigger**: `pull_request.opened`, `pull_request.synchronize`

### 3. Release Agent
- **Purpose**: Drafts semantic release notes from merged pull requests and commit messages.
- **Inputs**: Commit history, merged PR descriptions since last tag.
- **Outputs**: Formatted changelog markdown.
- **Trigger**: `push` to main branch, manual CLI invocation

### 4. Deduplication Agent
- **Purpose**: Detects duplicate issues using vector embeddings.
- **Inputs**: New issue body, database of existing open issues.
- **Outputs**: Confidence score, reference to potential duplicate issue.
- **Trigger**: `issues.opened`

## Extending Agents

To add a new agent, create a new class in `src/ai/agents/` extending the base `AIProvider` and register it within the plugin system. Ensure your system prompts are concise and return structured data whenever possible.