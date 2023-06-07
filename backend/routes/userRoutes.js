import express from 'express';
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile) // getUserProfile is a protected route.
    .put(protect, updateUserProfile); // updateUserProfile is a protected route.

export default router;