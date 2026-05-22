import express from 'express'
import { follow, getProfile, getUserFollowers, getUserFollowings, suggestedFollower } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/middleware.js';


const route = express.Router();

route.get('/profile/:id',protectedRoute,getProfile)
route.post('/follow/:id',protectedRoute,follow)
route.get('/suggestion',protectedRoute,suggestedFollower);
route.get('/getfollowings/:id',protectedRoute,getUserFollowings)
route.get('/getfollowers/:id',protectedRoute,getUserFollowers)

export default route;