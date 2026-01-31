# EMWAS API

## Overview
This is a Node.js/TypeScript Express API server. It provides a search aggregation API.

## Project Structure
- `src/` - TypeScript source files
  - `index.ts` - Main entry point, starts Express server
  - `App.ts` - Express application configuration
  - `router.ts` - API routes
  - `services.ts` - Service definitions
  - `search/` - Search functionality
  - `classes/` - Data classes
- `build/` - Compiled JavaScript output
- `test/` - Jest test files

## Tech Stack
- Node.js 20
- TypeScript 3.3
- Express 4.x
- Jest for testing

## Running the Project
- Development: `npm run dev`
- Production: `npm run start`
- Build: `npm run build`
- Tests: `npm run test`

## Configuration
- Server binds to `0.0.0.0:5000` for Replit compatibility
- API routes are under `/api/`

## Recent Changes
- 2026-01-31: Configured for Replit environment (port 5000, host 0.0.0.0)
