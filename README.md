# WellSync - Healthcare Wellness App

A modern, full-stack healthcare wellness application built with React, TypeScript, and Material-UI. WellSync enables patients to track their wellness goals and allows healthcare providers to monitor patient compliance.

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI) v7** - Component library
- **React Router v7** - Client-side routing
- **Redux Toolkit** - State management
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client

### Backend (Mock)
- **JSON Server** - RESTful API mock server

## 📁 Folder Structure

```
src/
├── api/
│   ├── client.ts              # Axios instance configuration
│   ├── hooks/                 # TanStack Query hooks
│   │   ├── index.ts           # Barrel exports
│   │   ├── useDashboard.ts    # Patient dashboard data
│   │   ├── useGoals.ts        # Goals CRUD operations
│   │   ├── usePatientDetails.ts # Provider patient details
│   │   ├── useProfile.ts      # Patient profile CRUD
│   │   └── useProvider.ts    # Provider patient list
│   └── mock/
│       └── db.json           # Mock database
├── app/
│   ├── routes.tsx            # Route configuration
│   └── store.ts              # Redux store setup
├── components/               # Shared components
│   ├── index.ts              # Barrel exports
│   ├── Navbar.tsx           # Navigation bar
│   ├── ProtectedRoute.tsx   # Auth guard
│   └── RoleGuard.tsx        # Role-based guard
├── features/                # Feature modules
│   ├── auth/
│   │   ├── index.ts         # Barrel exports
│   │   └── authSlice.ts    # Redux auth slice
│   ├── patient/
│   │   ├── index.ts         # Barrel exports
│   │   ├── components/
│   │   │   └── GoalTracker.tsx
│   │   └── pages/
│   │       ├── PatientDashboard.tsx
│   │       └── ProfilePage.tsx
│   └── provider/
│       ├── index.ts         # Barrel exports
│       └── pages/
│           ├── PatientDetails.tsx
│           └── ProviderDashboard.tsx
├── pages/                   # Public pages
│   ├── AboutPage.tsx
│   ├── LoginPage.tsx
│   ├── NotFoundPage.tsx
│   ├── PrivacyPage.tsx
│   └── RegisterPage.tsx
├── theme/
│   └── index.ts             # MUI theme configuration
├── App.tsx                  # Root component
└── main.tsx                 # Application entry point
```

## 🔄 Data Flow

### Authentication Flow
1. **Login/Register** → User submits credentials
2. **API Call** → POST/GET to `/users` endpoint
3. **Redux Action** → `setAuth()` dispatched with user data
4. **State Update** → Redux state updated + localStorage persisted
5. **Route Guard** → `ProtectedRoute` checks token, `RoleGuard` checks role
6. **Navigation** → User redirected to role-specific dashboard

### Data Fetching Flow
1. **Component** → Calls TanStack Query hook (e.g., `useDashboard()`)
2. **Query Cache** → Checks if data exists and is fresh (30s staleTime)
3. **API Call** → If stale/missing, fetches from JSON Server
4. **State Update** → Query cache updated, component re-renders
5. **Mutation** → On update, mutation invalidates related queries
6. **Auto Refetch** → Components automatically refetch updated data

### Route Protection Flow
1. **Route Access** → User navigates to protected route
2. **ProtectedRoute** → Checks if token exists (Redux or localStorage)
3. **RoleGuard** → Checks if user role matches required role
4. **Authorization** → If unauthorized, redirects to appropriate page
5. **Access Granted** → Component renders if authorized

## 🏃 How to Run

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Development

1. **Start Mock API Server** (Terminal 1):
```bash
npm run mock-api
```
This starts JSON Server on `http://localhost:5000` with mock data from `src/api/mock/db.json`.

2. **Start Vite Dev Server** (Terminal 2):
```bash
npm run dev
```
This starts the React app on `http://localhost:5173` (or next available port).

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 Test Credentials

### Patient Account
- **Email:** `patient@test.com`
- **Password:** `1234`
- **Role:** Patient
- **Access:** Dashboard, Goals, Profile

### Provider Account
- **Email:** `provider@test.com`
- **Password:** `1234`
- **Role:** Provider
- **Access:** Dashboard, Patient Details

## 📝 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run mock-api` - Start JSON Server mock API

## 🎯 Key Features

### Patient Features
- **Dashboard** - View wellness goals, reminders, and health tips
- **Goal Tracker** - Update daily goals (steps, water, sleep)
- **Profile Management** - View and edit profile information

### Provider Features
- **Patient List** - View all patients with compliance status
- **Patient Details** - View individual patient goals and profile

### Security Features
- **Authentication** - Login/Register with JWT tokens
- **Authorization** - Role-based route protection
- **State Persistence** - Auth state persisted in localStorage

## 🛠️ Configuration

### QueryClient Configuration
- **staleTime:** 30 seconds (data considered fresh for 30s)
- **retry:** 1 attempt on failure
- Configured in `src/main.tsx`

### Theme Configuration
- **Primary Color:** `#1976d2` (Material Blue)
- **Mode:** Light theme
- Configured in `src/theme/index.ts`

### API Configuration
- **Base URL:** `http://localhost:5000`
- Configured in `src/api/client.ts`

## 📦 Dependencies

### Core
- `react`, `react-dom` - UI framework
- `react-router-dom` - Routing
- `@reduxjs/toolkit`, `react-redux` - State management
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client

### UI
- `@mui/material` - Material-UI components
- `@emotion/react`, `@emotion/styled` - CSS-in-JS

### Development
- `json-server` - Mock API server
- `typescript` - Type checking
- `vite` - Build tool

## 🏗️ Architecture Decisions

### State Management
- **Redux Toolkit** for global auth state
- **TanStack Query** for server state (API data)
- **Local State** (useState) for component-specific UI state

### Routing
- **React Router v7** with nested route protection
- **ProtectedRoute** for authentication checks
- **RoleGuard** for role-based authorization

### Code Organization
- **Feature-based** folder structure
- **Barrel exports** for cleaner imports
- **Separation of concerns** (pages, components, hooks)

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Material-UI Documentation](https://mui.com)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
