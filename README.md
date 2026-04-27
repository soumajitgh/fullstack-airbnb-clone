# Fullstack Airbnb Clone

Monorepo Airbnb-style app built with React, NestJS, PostgreSQL, and S3-compatible storage.

## Stack

- `apps/client`: React + Vite
- `apps/server`: NestJS + TypeORM
- `postgres`: local database via Docker Compose
- `s3ninja`: local S3-compatible object storage via Docker Compose
- `pnpm` + Turborepo

## Requirements

- Node.js 20+
- pnpm 10+
- Docker
- Google Maps API key for client search/location features

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create the root env file:

```bash
cp .env.example .env
```

3. Start local services:

```bash
docker compose up -d
```

4. Start the apps:

```bash
pnpm dev
```

Client runs on `http://localhost:5173`.
Server runs on `http://localhost:8080`.

## Database

- TypeORM migrations are enabled on server startup
- `synchronize` is disabled
- migration history is stored in `migrations_history`

Useful commands:

```bash
pnpm --filter @airbnb-clone/server migration:run
pnpm --filter @airbnb-clone/server migration:revert
pnpm --filter @airbnb-clone/server migration:generate --name YourMigrationName
```

## Seed Data

Seed data lives in `scripts/seed/data.json`.

Run:

```bash
pnpm seed
```

This seeds users, listings, locations, and listing images.

## Local Storage

The app uses S3-compatible storage.

- Local endpoint: `http://localhost:9444`
- Local service: `s3ninja`

Seeded search recommendations in the client are based on destinations from `scripts/seed/data.json`.

## Scripts

```bash
pnpm dev
pnpm dev:client
pnpm dev:server
pnpm build
pnpm lint
pnpm seed
```

## Repo Layout

```text
apps/
  client/
  server/
docker/
scripts/seed/
docs/
```
