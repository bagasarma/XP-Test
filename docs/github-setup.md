# GitHub Repository Setup Guide

This guide will walk you through setting up the TaskEasy project on GitHub with CI/CD pipeline.

## Step 1: Create GitHub Repository

1. **Go to GitHub and create a new repository**
   - Visit https://github.com/new
   - Repository name: `taskeasy`
   - Description: "Task management application built with XP practices"
   - Make it **Public** (for free CI/CD)
   - **Don't** initialize with README (we have existing files)

2. **Clone and push your code**
   \`\`\`bash
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Initial commit
   git commit -m "feat: initial TaskEasy project setup with XP practices"
   
   # Add remote origin (replace YOUR_USERNAME)
   git remote add origin https://github.com/YOUR_USERNAME/taskeasy.git
   
   # Create and push main branch
   git branch -M main
   git push -u origin main
   
   # Create and push develop branch
   git checkout -b develop
   git push -u origin develop
   \`\`\`

## Step 2: Configure Branch Protection

1. **Go to repository Settings → Branches**
2. **Add rule for `main` branch:**
   - Branch name pattern: `main`
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Select status checks: `test`, `build`
   - ✅ Require conversation resolution before merging
   - ✅ Include administrators

3. **Add rule for `develop` branch:**
   - Branch name pattern: `develop`
   - ✅ Require status checks to pass before merging
   - Select status checks: `test`, `build`

## Step 3: Set Up Vercel Integration (Optional)

1. **Install Vercel CLI**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login and link project**
   \`\`\`bash
   vercel login
   vercel link
   \`\`\`

3. **Get Vercel tokens**
   \`\`\`bash
   # Get your tokens from Vercel dashboard
   # Go to https://vercel.com/account/tokens
   \`\`\`

4. **Add GitHub Secrets**
   Go to your repository → Settings → Secrets and variables → Actions
   
   Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

## Step 4: Configure GitHub Actions

The CI pipeline is already configured in `.github/workflows/ci.yml` and will automatically:

### On Push to `main` or `develop`:
- ✅ Run tests on Node.js 18.x and 20.x
- ✅ Check TypeScript types
- ✅ Run ESLint
- ✅ Build the application
- ✅ Deploy to Vercel (if configured)

### On Pull Requests:
- ✅ All the above checks
- ✅ Check commit message format
- ✅ Scan for TODO comments
- ✅ Generate coverage report
- ✅ Comment on PR with coverage details

## Step 5: Test the CI Pipeline

1. **Create a test feature branch**
   \`\`\`bash
   git checkout develop
   git checkout -b feature/test-ci
   \`\`\`

2. **Make a small change**
   \`\`\`bash
   # Edit README.md or add a comment
   echo "# Testing CI Pipeline" >> README.md
   git add README.md
   git commit -m "docs: test CI pipeline setup"
   git push origin feature/test-ci
   \`\`\`

3. **Create a Pull Request**
   - Go to GitHub and create a PR from `feature/test-ci` to `develop`
   - Watch the CI pipeline run
   - Check that all status checks pass

## Step 6: Set Up Local Git Hooks (Optional)

1. **Install Husky for git hooks**
   \`\`\`bash
   npm install --save-dev husky lint-staged
   npm run prepare
   \`\`\`

2. **Add pre-commit hook**
   \`\`\`bash
   npx husky add .husky/pre-commit "npx lint-staged"
   \`\`\`

3. **Add commit-msg hook**
   \`\`\`bash
   npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
   \`\`\`

## Step 7: Configure Issue Templates

Create `.github/ISSUE_TEMPLATE/` directory with templates:

### Bug Report Template
\`\`\`yaml
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''

body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!

  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: How can we reproduce this issue?
      placeholder: |
        1. Go to '...'
        2. Click on '....'
        3. Scroll down to '....'
        4. See error
    validations:
      required: true
\`\`\`

### Feature Request Template
\`\`\`yaml
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''

body:
  - type: textarea
    id: problem
    attributes:
      label: Is your feature request related to a problem?
      description: A clear and concise description of what the problem is.
      placeholder: I'm always frustrated when [...]

  - type: textarea
    id: solution
    attributes:
      label: Describe the solution you'd like
      description: A clear and concise description of what you want to happen.
    validations:
      required: true
\`\`\`

## Step 8: Add Status Badges

Add these badges to your README.md:

\`\`\`markdown
# TaskEasy

[![CI Pipeline](https://github.com/YOUR_USERNAME/taskeasy/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/taskeasy/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/YOUR_USERNAME/taskeasy/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/taskeasy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
\`\`\`

## Step 9: Team Collaboration Setup

### For XP Pair Programming:

1. **Add collaborators**
   - Go to Settings → Collaborators
   - Add team members with write access

2. **Set up VS Code Live Share**
   \`\`\`bash
   # Install VS Code Live Share extension
   code --install-extension ms-vsliveshare.vsliveshare
   \`\`\`

3. **Create pair programming schedule**
   - Use GitHub Projects or Issues to track pairing sessions
   - Rotate pairs regularly (XP practice)

## Troubleshooting

### Common Issues:

1. **CI fails on first run**
   - Check that all dependencies are in package.json
   - Ensure test files exist and pass locally

2. **Vercel deployment fails**
   - Verify all secrets are correctly set
   - Check Vercel project is linked correctly

3. **Branch protection prevents merging**
   - Ensure all status checks pass
   - Check that PR has required reviews

### Getting Help:

- Check GitHub Actions logs for detailed error messages
- Review the CI configuration in `.github/workflows/`
- Test commands locally before pushing

## Next Steps

1. ✅ Repository created and configured
2. ✅ CI/CD pipeline running
3. ✅ Branch protection enabled
4. ✅ Team access configured
5. 🔄 Start developing with XP practices!

Your TaskEasy project is now ready for collaborative development with proper CI/CD practices! 🚀
