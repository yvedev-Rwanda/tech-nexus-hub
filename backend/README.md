# Tech Nexus Backend (Unified Tech Ecosystem)

This directory now contains two versions of the backend:
1. **Classical (Legacy)**: The `server.js` and `models/` (Mongoose/MongoDB) - Original code.
2. **Production-Grade (New)**: The `src/` folder (TypeScript/Prisma/PostgreSQL) - New Architecture.

## New Architecture Features
- **Clean Architecture**: Layered into Controllers, Services, and Routes.
- **TypeScript**: Full type safety.
- **ORM**: Prisma for PostgreSQL.
- **Authentication**: JWT with Role-Based Access Control (RBAC).
- **Socket.IO**: Ready for real-time notifications.

## How to Run the New Backend
1. Ensure you have a PostgreSQL database running.
2. Update the `DATABASE_URL` in `backend/.env`.
3. In the `backend` folder:
```bash
npm install
npm run prisma:generate
npm run dev
```

## How to Run the Old Backend
```bash
npm run old:start
```
