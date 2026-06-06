import express from 'express'
import { protectedRoute } from '../middleware/middleware.js';
import { deleteChatMsg, getChats, oldChatUsers, sendMsg } from '../controllers/msg.controller.js';

const route = express.Router();

route.post('/msg',protectedRoute,sendMsg)
route.post('/sendMsg/:id',protectedRoute,sendMsg)
route.get('/getCh',protectedRoute,oldChatUsers);
route.get('/getMsg/:id',protectedRoute,getChats)
route.post('/deleteMsg/:msgId',protectedRoute,deleteChatMsg)

export default route;