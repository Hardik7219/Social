import express from 'express'
import {login, logout, getData, signin} from '../controllers/auth.controller.js'
import { protectedRoute } from '../middleware/middleware.js';

const route = express.Router();

route.post('/signin',signin)
route.post('/login',login)
route.post('/logout',logout)
route.get('/my',protectedRoute, getData)


export default route;