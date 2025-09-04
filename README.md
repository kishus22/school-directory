# School Directory – Complete Starter

A minimal Next.js (App Router) + Tailwind CSS + MySQL project that lets you add schools with an image and list them in a responsive grid.

## Prerequisites
- Node.js 18+
- MySQL running locally
- Create database and table:
```sql
CREATE DATABASE school_db;
USE school_db;
CREATE TABLE schools (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image VARCHAR(255) NOT NULL,
  email_id VARCHAR(100) NOT NULL
);
```

## Setup
1. Install dependencies
```bash
npm install
```
2. Copy env and fill values
```bash
cp .env.example .env.local
```
3. Run dev server
```bash
npm run dev
```
- Open http://localhost:3000
- Add school: http://localhost:3000/addSchool
- View schools: http://localhost:3000/showSchools

## Notes
- Images are saved to `public/schoolImages` and referenced by relative path.
- On serverless hosts (e.g., Vercel) the filesystem is read-only; use a persistent storage or an external bucket for images in production.
