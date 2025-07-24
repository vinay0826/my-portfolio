# Project Overview

This is a full-stack web application built with a modern tech stack featuring a cyberpunk-themed developer portfolio. The application showcases a futuristic terminal-style interface with a hacker aesthetic, complete with Matrix rain effects, glitch animations, and quantum computing visualizations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, utilizing Vite as the build tool and development server. The application features:
- **Component Library**: Extensive use of Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom cyberpunk theme variables
- **State Management**: React Query for server state management
- **Routing**: Wouter for client-side routing
- **UI Theme**: Dark mode cyberpunk aesthetic with neon colors, terminal effects, and futuristic animations

### Backend Architecture
The backend uses Express.js with TypeScript running on Node.js:
- **Framework**: Express.js with middleware for JSON parsing and request logging
- **Database Integration**: Configured for PostgreSQL using Drizzle ORM
- **Data Storage**: Currently uses in-memory storage with interface for easy database migration
- **API Structure**: RESTful API endpoints with `/api` prefix
- **Error Handling**: Centralized error handling middleware

### Key Components

#### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: User management with username/password authentication
- **Migrations**: Database migrations stored in `./migrations` directory
- **Current Implementation**: In-memory storage with interface pattern for easy database migration

#### Frontend Components
- **Terminal Interface**: Custom terminal component simulating command-line interface
- **Visual Effects**: Matrix rain background, quantum particle effects, glitch text animations
- **Navigation**: Smooth scrolling navigation with active section tracking
- **Sections**: Hero, Skills, Projects, Publications, About, Contact pages
- **Responsive Design**: Mobile-first approach with responsive breakpoints

#### Authentication & Storage
- **User Model**: Basic user schema with username and password fields
- **Storage Interface**: Abstracted storage layer supporting CRUD operations
- **Session Management**: Prepared for PostgreSQL session storage using connect-pg-simple

### Data Flow

1. **Client Requests**: React frontend makes API calls using React Query
2. **API Processing**: Express.js server handles requests with logging middleware
3. **Data Access**: Storage interface abstracts database operations
4. **Response**: JSON responses with proper error handling
5. **UI Updates**: React Query manages cache and UI state updates

### External Dependencies

#### Core Technologies
- **React 18**: Frontend framework with TypeScript support
- **Vite**: Fast development server and build tool
- **Express.js**: Node.js web framework
- **Drizzle ORM**: Type-safe PostgreSQL ORM
- **Tailwind CSS**: Utility-first CSS framework

#### UI Libraries
- **Radix UI**: Headless UI components for accessibility
- **shadcn/ui**: Pre-styled component library
- **Lucide React**: Icon library
- **Class Variance Authority**: Utility for component variants

#### Database & Cloud
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **PostgreSQL**: Primary database (configured but not yet implemented)
- **Replit Integration**: Development environment optimizations

#### Animation & Effects
- **Embla Carousel**: Carousel component for projects section
- **Custom CSS Animations**: Terminal effects, glitch animations, scanning lines
- **Date-fns**: Date manipulation utilities

### Deployment Strategy

#### Development
- **Vite Dev Server**: Hot module replacement for fast development
- **Express Middleware**: Vite integration for seamless full-stack development
- **Environment Variables**: Database URL and development flags
- **Replit Integration**: Special handling for Replit development environment

#### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served from build directory
- **Database**: PostgreSQL connection via environment variables

#### Scalability Considerations
- **Database**: Ready for PostgreSQL migration from in-memory storage
- **Caching**: React Query provides client-side caching
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Performance**: Optimized with code splitting and lazy loading

The architecture follows modern full-stack patterns with separation of concerns, making it easy to scale and maintain. The cyberpunk theme is consistently applied throughout with custom CSS variables and animations that create an immersive terminal experience.