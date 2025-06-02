# 📚 Clip Code - Snippet Sharing Platform

A full-stack web application for sharing, discovering, and managing code snippets across various categories and programming languages.

---

## 🚀 Features

- 🔐 **User Authentication** (Sign up / Sign in)
- 👀 **Explore Snippets** posted by the community
- 🔍 **Search Snippets** by programming language
- ✏️ **Create, Edit, Delete Snippets** (only your own)
- 🧠 **Categorize Snippets** into:
  - DSA
  - Web Development
  - DevOps / Linux
  - AI / ML
  - System Design
- 🏷️ **Tag Snippets** with meaningful, reusable tags
- ⚡ **Fast Backend** powered by Hono + Prisma + PostgreSQL
- 📦 **Shared Zod schemas** via a common npm module

---

## 🛠️ Tech Stack

### Backend
- [Hono](https://hono.dev/) – Fast web framework for Cloudflare Workers
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) – Schema validation

### Frontend *(planned / optional)*
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🧱 Database Schema

- `User`: Manages user auth
- `Snippet`: Code snippets with language, category, and tags
- `Category` / `Language` / `Tag`: Defined as Prisma enums

---
