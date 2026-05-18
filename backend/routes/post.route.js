import express from 'express'
import { protectedRoute } from '../middleware/middleware.js';
import { allPosts, commentPost, createPost, deletePost, likePost } from '../controllers/post.controller.js';


const route = express.Router();

route.post('/create',protectedRoute,createPost)
route.post('/like/:postId',protectedRoute ,likePost)
route.post('/comment/:postId',protectedRoute,commentPost)
route.post('/delete/:postId',protectedRoute,deletePost)
route.get('/posts',protectedRoute,allPosts)

export default route;