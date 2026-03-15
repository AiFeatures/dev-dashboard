# Copilot Instructions

## Project Context
This repository is part of the iAiFy GitHub Enterprise.

## Conventions
- Use kebab-case for file and folder names
- Follow conventional commits: feat:, fix:, docs:, chore:, refactor:, test:
- All code must pass lint and security checks before merge
- Use TypeScript for frontend, Node.js/Python/Go for backend
- Write tests for new features

## CI/CD
Reusable workflows are available from:
- `AiFeatures/enterprise-ci-cd/.github/workflows/` — CI/CD pipelines
- `AiFeatures/github-actions/` — Composite actions

## Security
- Never commit secrets or API keys
- Use GitHub Secrets for sensitive values
- Run security scans before deployment
