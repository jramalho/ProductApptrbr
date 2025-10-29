# Contributing to ProductApptrbr

Thank you for your interest in contributing to ProductApptrbr! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## 📜 Code of Conduct

This project adheres to a code of conduct to ensure a welcoming and inclusive environment for all contributors. By participating, you are expected to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

1. Read the [README.md](README.md) thoroughly
2. Set up the development environment as described
3. Familiarized yourself with the project structure
4. Run the app locally and explored its features

### Finding an Issue to Work On

1. Check the [issue tracker](https://github.com/jramalho/ProductApptrbr/issues)
2. Look for issues labeled `good first issue` or `help wanted`
3. Comment on the issue to express your interest
4. Wait for maintainer approval before starting work

## 💻 Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/ProductApptrbr.git
cd ProductApptrbr

# Add upstream remote
git remote add upstream https://github.com/jramalho/ProductApptrbr.git
```

### 2. Create a Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### 3. Make Changes

- Write clean, readable code
- Follow existing code style and conventions
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass locally

### 4. Commit Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add product search functionality"
```

### 5. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

## 🎨 Coding Standards

### TypeScript

- **Use TypeScript**: All new code must be written in TypeScript
- **Strict Mode**: Follow TypeScript strict mode rules
- **Type Annotations**: Provide explicit types for function parameters and return values
- **Interfaces**: Use interfaces for object shapes
- **Avoid `any`**: Use proper types instead of `any` whenever possible

```typescript
// ✅ Good
interface UserData {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<UserData> {
  // Implementation
}

// ❌ Bad
function getUser(id: any): any {
  // Implementation
}
```

### React Components

- **Functional Components**: Use functional components with hooks
- **Props Interface**: Define props interface for every component
- **Default Props**: Use destructuring with default values when appropriate
- **Naming**: Use PascalCase for component names

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onPress, disabled = false }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
```

### Styling

- **Styled Components**: Use styled-components for all styling
- **Colocated Styles**: Keep styles in a `styles.ts` file next to the component
- **Naming**: Use descriptive names for styled components
- **Theme**: Use theme constants when available

```typescript
// styles.ts
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #ffffff;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`;
```

### File Organization

```
ComponentName/
├── index.tsx       # Component implementation
├── styles.ts       # Styled components
└── types.ts        # Type definitions (if complex)
```

### Imports

- **Order**: React imports first, then third-party, then local
- **Absolute Imports**: Use absolute imports for clarity when needed
- **Named Exports**: Prefer named exports for utilities and hooks

```typescript
// ✅ Good import order
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import * as S from './styles';
import { ProductItem } from '../../types';
import { getProducts } from '../../services';
```

## 🧪 Testing Guidelines

### Writing Tests

- **Coverage**: Aim for 80%+ code coverage
- **Test Files**: Place tests in `__tests__/` directory
- **Naming**: Use `ComponentName.test.tsx` or `functionName.test.ts`
- **Structure**: Follow Arrange-Act-Assert pattern

```typescript
// ✅ Good test structure
describe('ProductItem Component', () => {
  it('displays product information correctly', () => {
    // Arrange
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      rating: 4.5,
    };

    // Act
    const { getByText } = render(<ProductItem {...mockProduct} />);

    // Assert
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
  });
});
```

### Test Coverage Requirements

- **New Features**: Must include tests
- **Bug Fixes**: Must include regression tests
- **Refactoring**: Maintain or improve existing test coverage

### Running Tests

```bash
# Run all tests
yarn test

# Run specific test file
yarn test ProductItem.test.tsx

# Run with coverage
yarn test --coverage

# Watch mode during development
yarn test --watch
```

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(search): add product search functionality

# Bug fix
fix(navigation): correct deep link navigation on Android

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(services): simplify API error handling

# Test
test(product): add tests for product detail page
```

### Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Reference issues and pull requests when relevant
- Provide detailed description in body for complex changes

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch** with latest changes from main:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run all checks**:
   ```bash
   yarn lint        # Check code style
   yarn test        # Run all tests
   yarn tsc --noEmit  # Check TypeScript
   ```

3. **Update documentation** if needed

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots or GIFs

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests pass
- [ ] No new warnings or errors
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Keep PR focused on a single concern
4. Be responsive to feedback
5. Once approved, maintainers will merge your PR

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Verify the bug exists in the latest version
3. Collect relevant information (device, OS version, steps to reproduce)

### Bug Report Template

```markdown
**Describe the bug**
Clear and concise description

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- Device: [e.g., iPhone 14, Samsung Galaxy S23]
- OS: [e.g., iOS 16.5, Android 13]
- App Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

## 💡 Suggesting Enhancements

### Enhancement Proposal Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution**
How you'd like it to work

**Describe alternatives**
Other solutions you've considered

**Additional context**
Mockups, examples, or references
```

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)

## ❓ Questions?

If you have questions:
- Check existing [documentation](README.md)
- Search [existing issues](https://github.com/jramalho/ProductApptrbr/issues)
- Ask in [discussions](https://github.com/jramalho/ProductApptrbr/discussions)

Thank you for contributing to ProductApptrbr! 🎉
