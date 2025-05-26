# TaskEasy - Setup Instructions

## Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git
- GitHub account
- Vercel account (for deployment)

## Local Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/taskeasy.git
   cd taskeasy
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Run tests**
   \`\`\`bash
   # Run tests once
   npm test

   # Run tests in watch mode
   npm run test:watch

   # Run tests with coverage
   npm run test:coverage
   \`\`\`

5. **Run linting**
   \`\`\`bash
   npm run lint
   \`\`\`

## GitHub Repository Setup

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it "taskeasy"
   - Make it public
   - Don't initialize with README (we already have files)

2. **Push your code to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit: TaskEasy XP project setup"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/taskeasy.git
   git push -u origin main
   \`\`\`

3. **Create a develop branch**
   \`\`\`bash
   git checkout -b develop
   git push -u origin develop
   \`\`\`

## CI/CD Pipeline Setup

### GitHub Actions Configuration

The CI pipeline is already configured in `.github/workflows/ci.yml` and will:

- Run on pushes to `main` and `develop` branches
- Run on pull requests to `main`
- Test on Node.js 18.x and 20.x
- Run TypeScript type checking
- Run ESLint
- Run Jest tests with coverage
- Build the Next.js application
- Upload coverage to Codecov (optional)

### Vercel Deployment Setup

1. **Connect Vercel to GitHub**
   - Go to https://vercel.com
   - Sign up/in with GitHub
   - Import your repository

2. **Get Vercel tokens for GitHub Actions**
   \`\`\`bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and get tokens
   vercel login
   vercel link
   \`\`\`

3. **Add GitHub Secrets**
   Go to your GitHub repository → Settings → Secrets and variables → Actions

   Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

## XP Practices Implementation

### Pair Programming
- Use VS Code Live Share for remote pairing
- Switch driver/navigator roles every 25 minutes
- Commit frequently with pair initials: `git commit -m "Add task validation [AB/CD]"`

### Test-Driven Development
1. Write a failing test first
2. Write minimal code to make it pass
3. Refactor while keeping tests green

### Continuous Integration
- All tests must pass before merging
- Code coverage should be maintained above 70%
- Linting errors must be fixed

### Small Releases
- Create feature branches from `develop`
- Make small, focused commits
- Create pull requests for code review
- Deploy to staging on `develop` pushes
- Deploy to production on `main` pushes

## Branch Strategy

\`\`\`
main (production)
├── develop (staging)
    ├── feature/task-creation
    ├── feature/task-editing
    └── feature/task-filtering
\`\`\`

## Commit Message Convention

\`\`\`
type(scope): description

Examples:
feat(tasks): add task creation functionality
fix(ui): resolve button alignment issue
test(utils): add tests for task validation
refactor(components): simplify TaskForm component
docs(readme): update setup instructions
\`\`\`

## Testing Strategy

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test component interactions
- **Coverage Target**: Maintain 70%+ code coverage
- **Test Files**: Place in `__tests__/` directory

## Code Quality

- **ESLint**: Enforces code style and catches errors
- **TypeScript**: Provides type safety
- **Prettier**: Code formatting (configure in your IDE)
- **Husky**: Git hooks for pre-commit checks (optional)

## Deployment

- **Staging**: Automatic deployment on `develop` branch
- **Production**: Automatic deployment on `main` branch
- **Preview**: Automatic deployment for pull requests

## Monitoring

- **GitHub Actions**: CI/CD pipeline status
- **Vercel**: Deployment status and performance
- **Codecov**: Test coverage reports (optional)
