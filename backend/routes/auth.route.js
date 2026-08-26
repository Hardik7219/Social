import express from 'express'
import {login, logout, getData,signup, varifi} from '../controllers/auth.controller.js'
import { protectedRoute } from '../middleware/middleware.js';

const route = express.Router();

route.post('/signup',signup)
route.post('/login',login)
route.post('/logout',logout)
route.get('/my',protectedRoute, getData)
route.post('/varifi',varifi)

export default route;