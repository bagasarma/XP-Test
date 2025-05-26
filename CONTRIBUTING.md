# Contributing to TaskEasy

Thank you for your interest in contributing to TaskEasy! This document outlines our development process and guidelines.

## Development Workflow

### 1. Setting Up Your Development Environment

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/taskeasy.git
cd taskeasy

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### 2. Branch Strategy

We use a Git flow-inspired branching strategy:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `hotfix/*` - Critical bug fixes for production

### 3. Creating a Feature Branch

\`\`\`bash
# Switch to develop branch
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat(scope): description of changes"

# Push your branch
git push origin feature/your-feature-name
\`\`\`

## Extreme Programming (XP) Practices

### Pair Programming

- Use VS Code Live Share for remote pairing sessions
- Switch driver/navigator roles every 25 minutes
- Include both developers' initials in commit messages: `[AB/CD]`

### Test-Driven Development (TDD)

1. **Red**: Write a failing test first
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests green

\`\`\`bash
# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Continuous Integration

All code must pass these checks before merging:

- TypeScript type checking
- ESLint linting
- Jest unit tests (70%+ coverage)
- Build verification

### Small Releases

- Make small, focused commits
- Create pull requests for code review
- Deploy frequently to get feedback

## Code Quality Standards

### Commit Message Convention

We follow the conventional commits specification:

\`\`\`
type(scope): description

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc.)
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks

Examples:
feat(tasks): add task creation functionality
fix(ui): resolve button alignment issue
test(utils): add tests for task validation
\`\`\`

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules (automatically enforced)
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Testing Guidelines

- Write tests for all new features
- Maintain 70%+ code coverage
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

\`\`\`typescript
// Good test example
describe('TaskForm', () => {
  it('should call addTask when form is submitted with valid data', async () => {
    // Arrange
    const mockAddTask = jest.fn()
    render(<TaskForm addTask={mockAddTask} />)
    
    // Act
    await user.type(screen.getByLabelText(/title/i), 'Test Task')
    await user.click(screen.getByRole('button', { name: /add task/i }))
    
    // Assert
    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'Test Task',
      // ... other properties
    })
  })
})
\`\`\`

## Pull Request Process

### Before Creating a PR

1. Ensure all tests pass: `npm test`
2. Check code coverage: `npm run test:coverage`
3. Run linting: `npm run lint`
4. Build the project: `npm run build`

### PR Requirements

- [ ] Descriptive title and description
- [ ] All CI checks passing
- [ ] Code coverage maintained above 70%
- [ ] No TODO/FIXME comments
- [ ] Proper commit message format
- [ ] Self-review completed

### PR Template

\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Coverage maintained above 70%

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass locally
- [ ] Documentation updated if needed
\`\`\`

## Local Development Commands

\`\`\`bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Testing
npm test                # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking
\`\`\`

## Getting Help

- Check existing issues on GitHub
- Ask questions in pull request comments
- Reach out to maintainers for guidance

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow XP principles of communication and collaboration

Thank you for contributing to TaskEasy! 🚀
