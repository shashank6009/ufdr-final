# UFDR Copilot

A secure forensic analysis platform built with modern web technologies.

## Architecture

This is a monorepo containing:

- **frontend/** - React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **backend/** - FastAPI + Python 3.11
- **shared/** - Shared types and constants

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (optional)

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd ufdr-final
   npm install
   ```

2. **Setup environment:**
   ```bash
   cp .env.example .env
   ```

3. **Start development servers:**
   ```bash
   # Option 1: Using npm scripts
   npm run dev

   # Option 2: Start individually
   npm run dev:frontend  # Frontend on http://localhost:5173
   npm run dev:backend   # Backend on http://localhost:8000
   ```

4. **Using Docker (alternative):**
   ```bash
   docker-compose up -d
   ```

### Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run build` - Build all packages
- `npm run lint` - Lint all code
- `npm run format` - Format all code
- `npm run docker:up` - Start with Docker Compose
- `npm run docker:down` - Stop Docker services

## API Documentation

Once the backend is running, visit:
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
ufdr-final/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── backend/           # FastAPI backend application
│   ├── app/
│   ├── tests/
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── shared/            # Shared types and constants
│   ├── src/
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   └── package.json
├── docker-compose.yml
├── package.json       # Root package.json (monorepo)
└── README.md
```

## Features

- 🔒 **Secure Authentication** - JWT-based authentication system
- 📊 **Forensic Analysis** - Advanced data processing capabilities
- 🔍 **Investigation Tools** - Comprehensive search and analysis utilities
- 📋 **Report Generation** - Automated forensic report creation
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode
- 🐳 **Docker Support** - Containerized deployment
- 🔧 **Developer Tools** - ESLint, Prettier, Husky pre-commit hooks

## Development Guidelines

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new forensic analysis feature
fix: resolve authentication bug
docs: update API documentation
style: format code with prettier
refactor: improve evidence processing logic
test: add unit tests for analysis module
chore: update dependencies
```

### Code Style

- Frontend: ESLint + Prettier
- Backend: Black + isort + flake8
- Pre-commit hooks ensure code quality

## License

This project is proprietary software for forensic analysis purposes.
