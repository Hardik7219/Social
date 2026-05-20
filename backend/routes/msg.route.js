import express from 'express'
import { protectedRoute } from '../middleware/middleware.js';
import { getChats, oldChatUsers, sendMsg } from '../controllers/msg.controller.js';

const route = express.Router();

route.post('/msg',protectedRoute,sendMsg)
route.post('/sendMsg/:id',protectedRoute,sendMsg)
route.get('/getCh',protectedRoute,oldChatUsers);
route.get('/getMsg/:id',protectedRoute,getChats)
export default route;