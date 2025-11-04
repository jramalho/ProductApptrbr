# Code Quality Tools

This document describes the code quality tools and automated checks configured for the ProductApptrbr project.

## Overview

The project uses several tools to maintain code quality and consistency:

- **Husky**: Git hooks automation
- **lint-staged**: Run linters on staged files before commit
- **ESLint**: JavaScript/TypeScript code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

## Git Hooks

### Pre-commit Hook

Automatically runs before every commit to ensure code quality:

1. **ESLint**: Fixes linting errors in staged files
2. **Prettier**: Formats staged files according to project standards

Only staged files are processed, making commits fast and efficient.

### Commit Message Hook

Validates commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>
```

**Allowed Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `perf`: Performance improvements
- `ci`: CI/CD configuration changes
- `build`: Build system changes
- `revert`: Revert previous commit

**Examples:**
```bash
feat: add search functionality
fix(api): resolve network timeout issue
docs: update README with setup instructions
refactor(home): simplify product filtering logic
test: add tests for favorites feature
chore: update dependencies
```

## Available Scripts

### Linting

```bash
# Run ESLint on all files
yarn lint

# Run ESLint and auto-fix issues
yarn lint:fix
```

### Formatting

```bash
# Format all files with Prettier
yarn format

# Check formatting without modifying files
yarn format:check
```

### Type Checking

```bash
# Run TypeScript compiler without emitting files
yarn type-check
```

### Testing

```bash
# Run Jest tests
yarn test
```

## Configuration

### ESLint (.eslintrc.js)

Configured with React Native specific rules. Files are automatically linted before commit.

### Prettier (.prettierrc.js)

Code formatting rules applied consistently across the project:
- Single quotes for strings
- 2-space indentation
- Semicolons required
- Trailing commas in multi-line structures
- Arrow function parentheses as needed

### lint-staged (package.json)

Configured to run on staged files only:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

## Benefits

### Consistency
- Automated formatting ensures consistent code style across the team
- No more debates about tabs vs spaces or semicolons

### Quality
- ESLint catches common errors and bad practices before they reach code review
- TypeScript type checking prevents type-related bugs

### Efficiency
- Automated checks run only on changed files
- Issues are caught immediately, not during code review
- CI/CD pipelines run faster with pre-validated code

### Developer Experience
- Developers can focus on logic instead of formatting
- Reduced cognitive load from consistent patterns
- Faster onboarding for new contributors

## Bypassing Hooks (Not Recommended)

In exceptional cases, you can bypass hooks:

```bash
# Skip pre-commit hook
git commit --no-verify

# Skip commit-msg hook
git commit --no-verify
```

**⚠️ Warning**: Only bypass hooks when absolutely necessary, as they exist to maintain code quality.

## Troubleshooting

### Hook Not Running

If hooks aren't executing:

```bash
# Reinstall hooks
yarn prepare

# Make hooks executable (Unix/Mac)
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### Linting Errors

If ESLint reports errors that can't be auto-fixed:

1. Review the error messages
2. Fix issues manually
3. Run `yarn lint` to verify
4. Commit again

### Commit Message Rejected

If your commit message is rejected:

1. Review the Conventional Commits format
2. Amend your commit message:
   ```bash
   git commit --amend -m "feat: your new message"
   ```

## CI/CD Integration

These tools complement CI/CD pipelines:

1. **Pre-commit**: Fast local checks
2. **CI Pipeline**: Comprehensive checks on all files
3. **Result**: Faster feedback loop and fewer failed builds

## Future Enhancements

Potential improvements for the code quality setup:

- **Commitlint**: More robust commit message validation
- **Danger**: Automate code review comments
- **Bundle Size Monitoring**: Track app bundle size changes
- **Automated Dependency Updates**: Renovate or Dependabot
- **Code Coverage Enforcement**: Require minimum test coverage
- **Pre-push Hooks**: Run tests before pushing

## References

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
