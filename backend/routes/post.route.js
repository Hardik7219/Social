import express from 'express'
import { protectedRoute } from '../middleware/middleware.js';
import { commentPost, createPost, likePost } from '../controllers/post.controller.js';


const route = express.Router();

route.post('/create',protectedRoute,createPost)
route.post('/like/:postId',protectedRoute ,likePost)
route.post('/comment/:postId',protectedRoute,commentPost)

export default route;