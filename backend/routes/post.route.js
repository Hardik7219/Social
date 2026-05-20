import express from 'express'
import { protectedRoute } from '../middleware/middleware.js';
import { allPosts, commentPost, createPost, deletePost, likePost, userPost } from '../controllers/post.controller.js';
import upload
from "../middleware/upload.js";

const route = express.Router();

route.post('/create',protectedRoute,upload.single('img'),createPost)
route.post('/like/:postId',protectedRoute ,likePost)
route.post('/comment/:postId',protectedRoute,commentPost)
route.post('/delete/:postId',protectedRoute,deletePost)
route.get('/posts',protectedRoute,allPosts)
route.get('/userPosts/:id',protectedRoute,userPost)
export default route;