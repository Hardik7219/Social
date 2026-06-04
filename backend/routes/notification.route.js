import express from "express";
import { protectedRoute } from "../middleware/middleware.js";
import { deleteNotifications, getNotifications, getUnreadNotificationCount } from "../controllers/notification.controller.js";


const router = express.Router();

router.get("/", protectedRoute,getNotifications);
router.delete("/",protectedRoute,deleteNotifications);
router.get("/unread-count",protectedRoute,getUnreadNotificationCount);
export default router;