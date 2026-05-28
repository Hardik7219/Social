# Social — Developer Social Platform

A full-stack social media app built for developers. Share posts, snippets of code, follow other devs, and chat in real time.

---

## Features

- **Auth** — JWT-based signup, login, and logout with secure HTTP-only cookies
- **Posts** — Create normal posts with images or code posts with syntax highlighting
- **Feed** — View all posts or just posts from people you follow
- **Likes & Comments** — Optimistic UI updates via React Query
- **Real-time Chat** — One-on-one messaging powered by Socket.IO
- **Follow System** — Follow/unfollow users, view follower and following lists
- **Notifications** — Like and follow notifications
- **Profile** — View and update your profile (username, name, bio, avatar)
- **Search** — Search users by name or username
- **Suggested Users** — Discover new people to follow

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| File uploads | Multer + Cloudinary |
| Real-time | Socket.IO |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React  |
| Routing | React Router  |
| Data fetching | TanStack Query  |
| Styling | Tailwind CSS v4 |
| HTTP client | Axios |
| Real-time | Socket.IO Client |
| Code highlighting | react-syntax-highlighter |

---

Create a `.env` file in `/backend`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
BACKEND_PORT=4000
NODE_ENV=development
```

Create a `.env` file in `/frontend`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

