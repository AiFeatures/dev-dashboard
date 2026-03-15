# CLAUDE.md

## Project: dev-dashboard
**Organization:** AiFeatures (iAiFy Enterprise)

## Build & Test
- Install: `npm install` or `pip install -r requirements.txt`
- Test: `npm test` or `pytest`
- Lint: `npm run lint` or `ruff check .`

## Conventions
- kebab-case for files and folders
- Conventional commits (feat:, fix:, docs:, chore:)
- TypeScript strict mode for TS projects
- Always run tests before committing

## CI/CD
- Reusable workflows: `AiFeatures/enterprise-ci-cd`
- Shared actions: `AiFeatures/github-actions`

## Git
- Never push to main directly
- Create PRs with descriptive titles
- Squash merge preferred
