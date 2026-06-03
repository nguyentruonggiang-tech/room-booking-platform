# Room Booking Platform

An Airbnb-inspired room booking application built with Next.js 16 App Router.

## Tech Stack

- **Framework**: Next.js 16 App Router, TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand (auth, search, theme)
- **Form**: React Hook Form + Zod
- **HTTP**: Axios with automatic token interceptor
- **UI**: lucide-react (icons), Sonner (toast), SweetAlert2 (confirm dialog)
- **Map**: Leaflet

## Features

### Client (Home)
- Home page — featured locations, suggested rooms
- Room search by location, date, guest count (debounced)
- Room list by location
- Room detail — info, booking form, comments
- Register / Login — form validation, token storage
- User profile — update info, avatar upload, booking history
- Dark mode toggle (persisted to localStorage)

### Admin
- Dashboard — shortcuts to 4 management modules
- User management — CRUD, debounced search, pagination
- Location management — CRUD, image upload, search, pagination
- Room management — CRUD, image upload, amenities, location picker
- Booking management — list view, delete

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (home)/           # Home layout group
│   ├── admin/            # Admin layout group
│   └── globals.css
├── features/             # Feature-based modules
│   ├── admin/
│   │   ├── bookings/
│   │   ├── locations/
│   │   ├── rooms/
│   │   └── users/
│   ├── auth/
│   ├── bookings/
│   ├── comments/
│   ├── home/
│   ├── locations/
│   ├── rooms/
│   └── users/
├── components/           # Shared UI components
├── shared/               # Utilities, pagination, types
├── services/             # Axios instance, endpoints
├── store/                # Zustand stores
└── hooks/                # Custom hooks
```

## API

Connects to the Cybersoft API. Auth token is automatically attached via Axios request interceptor.
