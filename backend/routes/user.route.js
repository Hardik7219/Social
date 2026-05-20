import express from 'express'
import { follow, getProfile, suggestedFollower } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/middleware.js';


const route = express.Router();

route.get('/profile/:id',protectedRoute,getProfile)
route.post('/follow/:id',protectedRoute,follow)
route.get('/suggestion',protectedRoute,suggestedFollower);


export default route;