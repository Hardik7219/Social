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
| Framework | React 19 |
| Routing | React Router v7 |
| Data fetching | TanStack Query v5 |
| Styling | Tailwind CSS v4 |
| HTTP client | Axios |
| Real-time | Socket.IO Client |
| Code highlighting | react-syntax-highlighter |

---

## Project Structure

```
/
├── backend/
│   ├── config/          # Cloudinary config
│   ├── controllers/     # Route handlers (auth, user, post, msg, notification)
│   ├── db/              # MongoDB connection
│   ├── lib/             # JWT token generator
│   ├── middleware/       # Auth middleware, Multer upload
│   ├── models/          # Mongoose schemas (User, Post, Msg, Notification)
│   ├── routes/          # Express routers
│   ├── socket/          # Socket.IO server
│   └── server.js        # App entry point
│
└── frontend/
    └── src/
        ├── components/  # Shared UI (Post, Comment, Navbar, Skeletons...)
        ├── context/     # Auth context + provider
        ├── features/    # Page-level feature modules
        │   ├── auth/    # Login, Signup
        │   ├── home/    # Home layout
        │   ├── posts/   # Post feed + create post
        │   ├── profile/ # Profile page
        │   ├── chats/   # Chat list
        │   ├── search/  # User search
        │   └── ...
        ├── hooks/       # useAuth
        ├── lib/         # Axios instance
        ├── routes/      # PrivateRoute
        ├── services/    # API call functions
        └── socket/      # Socket.IO client instance
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Clone the repo

```bash
git clone https://github.com/your-username/social.git
cd social
```

### 2. Backend setup

```bash
cd backend
npm install
```

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

Start the server:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Overview

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login and receive JWT cookie |
| POST | `/logout` | Clear session cookie |
| GET | `/my` | Get current authenticated user |

### Users — `/api/user`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/profile/:id` | Get user profile |
| POST | `/follow/:id` | Follow or unfollow a user |
| GET | `/suggestion` | Get suggested users |
| GET | `/getfollowers/:id` | Get a user's followers |
| GET | `/getfollowings/:id` | Get a user's followings |
| PUT | `/update` | Update profile (with avatar upload) |
| GET | `/search?q=` | Search users by name or username |

### Posts — `/api/post`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/create` | Create a post (image or code) |
| POST | `/delete/:postId` | Delete a post |
| POST | `/like/:postId` | Like or unlike a post |
| POST | `/comment/:postId` | Add a comment |
| GET | `/posts` | Get all posts |
| GET | `/userPosts/:id` | Get posts by a specific user |
| GET | `/getfollowerpost` | Get posts from followed users |

### Messages — `/api/msg`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/sendMsg/:id` | Send a message to a user |
| GET | `/getMsg/:id` | Get chat history with a user |
| GET | `/getCh` | Get all users you've chatted with |

### Notifications — `/api/notification`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all notifications |
| DELETE | `/` | Clear all notifications |

---

## Socket Events

| Event | Direction | Payload | Description |
|---|---|---|---|
| `add_user` | Client → Server | `userId` | Register user's socket connection |
| `send_message` | Client → Server | `{ receiverId, ...msg }` | Send a chat message |
| `receive_message` | Server → Client | message object | Deliver an incoming message |

---

## License

MIT
