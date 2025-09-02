# Dalian

Modern web application built with Next.js 15, React 19, and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Code Quality**: ESLint 9 + Prettier
- **Git Hooks**: Husky + lint-staged
- **Validation**: Zod
- **Utilities**: clsx, tailwind-merge
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/          # Next.js App Router (pages & layouts)
├── components/   # Reusable UI components
│   └── ui/       # Basic UI components
├── lib/          # Core configurations & integrations
│   └── env.ts    # Environment variable validation
├── utils/        # Utility functions
│   ├── ui.ts     # UI-related utilities (cn function)
│   └── common.ts # General utilities (debounce, etc.)
├── hooks/        # Custom React hooks
├── types/        # TypeScript type definitions
└── styles/       # Global styles
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone repository
git clone <repository-url>
cd dalian

# Install dependencies
npm install

# Setup environment variables (optional)
cp .env.example .env.local
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server (with Turbo)
npm run dev:debug        # Start with debug mode

# Build & Production
npm run build           # Build for production
npm run start           # Start production server
npm run clean           # Clean build artifacts

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run format:check    # Check Prettier formatting
npm run type-check      # TypeScript type checking
npm run check-all       # Run all quality checks

# Testing
npm run test            # Run tests (placeholder)
```

## 🔧 Configuration

### Path Aliases

Configured absolute imports for cleaner code:

```typescript
// Available path aliases
import Button from "@/components/ui/Button";
import { cn } from "@/utils/ui";
import { debounce } from "@/utils/common";
import { env } from "@/lib/env";
import type { User } from "@/types";
```

### Environment Variables

Environment variables are validated using Zod for type safety:

```bash
# .env.local (create from .env.example)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Dalian

# Add more variables as needed:
# DATABASE_URL=postgresql://...
# API_SECRET_KEY=your-secret-key
```

**Environment validation** automatically runs on app start and provides helpful error messages for missing or invalid variables.

## 📝 Development Guidelines

### Code Quality

- **TypeScript**: Strict mode enabled for all files
- **ESLint**: Configured with Next.js, React, and accessibility rules
- **Prettier**: Auto-formatting with Tailwind class sorting
- **Path imports**: Use `@/` prefix for absolute imports
- **Naming**: Use descriptive names and consistent patterns

### Git Workflow

- **Pre-commit hooks**: Automatically run ESLint and Prettier on staged files
- **Commit messages**: Write clear, descriptive commit messages
- **Branch strategy**: Feature branches → Pull requests → Main branch

### Utility Functions

- **`cn()`**: Tailwind class merging utility
- **`debounce()`**: Function debouncing for performance
- **Environment validation**: Type-safe environment variable access

## 🚀 CI/CD & Deployment

### GitHub Actions

Automated pipeline on every push/PR:

1. **Lint & Type Check**: ESLint + TypeScript validation
2. **Build**: Production build verification
3. **Deploy**: Automatic deployment to Vercel (main branch only)

### Vercel Deployment

- **Automatic deployment** on push to main branch
- **Preview deployments** for pull requests
- **Environment variables** managed in Vercel dashboard
- **GitHub integration** waits for CI checks before deploying

### Manual Build

```bash
npm run build    # Creates .next/ directory
npm run start    # Serves production build locally
```

## 🔄 Code Quality Automation

- **Pre-commit**: ESLint + Prettier run automatically before commits
- **CI Pipeline**: Full quality checks on every push
- **Type Safety**: Environment variables validated at build time
- **Import Organization**: Auto-sorted imports with proper grouping

## 📦 Key Dependencies

- **clsx + tailwind-merge**: Dynamic className handling
- **zod**: Runtime type validation for environment variables
- **husky + lint-staged**: Git hooks for code quality
- **prettier-plugin-tailwindcss**: Tailwind class sorting

## 📚 Additional Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev)
