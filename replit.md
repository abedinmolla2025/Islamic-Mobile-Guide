# Noor - Islamic Companion App

## Overview

Noor is a comprehensive Islamic companion Progressive Web App (PWA) that provides Muslims with essential daily tools including prayer times, Quran reading, Qibla direction, digital tasbih counter, and duas/azkar collections. The application is built as a mobile-first experience with offline capabilities through service worker caching.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS v4 with custom Islamic-themed design system (greens and golds)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Static Serving**: Express static middleware serves built frontend assets

### Data Storage
- **Database Schema**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Migrations**: Drizzle Kit generates migrations to `./migrations` directory
- **Client Storage**: LocalStorage for user preferences (tasbih count, location, last read position)
- **In-Memory Fallback**: MemStorage class in `server/storage.ts` for development

### Key Design Decisions

1. **Monorepo Structure**: Client (`client/`), server (`server/`), and shared code (`shared/`) in one repository with path aliases (`@/`, `@shared/`)

2. **PWA Implementation**: Service worker (`sw.js`) with cache-first strategy for offline functionality; manifest.json for installability

3. **Prayer Time Calculation**: Client-side calculation using geolocation API with `adhan` library support; falls back to Dhaka coordinates

4. **Hijri Calendar**: Custom conversion algorithm in `client/src/lib/hijri.ts` using Umm al-Qura calendar approximation

5. **Qibla Direction**: Calculates bearing to Kaaba (21.4225°N, 39.8262°E) from user location with device compass integration

## External Dependencies

### Third-Party Services
- **Google Fonts**: Amiri (Arabic text) and Outfit (UI text) font families
- **Geolocation API**: Browser native API for user location detection

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with Zod schema validation

### Key NPM Packages
- `adhan`: Islamic prayer time calculations
- `drizzle-orm` / `drizzle-kit`: Database ORM and migration tooling
- `@tanstack/react-query`: Async state management
- `date-fns`: Date manipulation utilities
- `wouter`: Client-side routing
- `zod`: Runtime type validation

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Development error overlay
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator
- Custom `vite-plugin-meta-images`: OpenGraph image URL management for deployments