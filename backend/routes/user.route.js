import express from "express";
import verifyjwt from "../middlewares/verifyjwt.js";
import { 
  editProfile, 
  followOrUnfollow, 
  getProfile, 
  getSuggestedUsers, 
  login, 
  logout, 
  register 
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register);  // Register a new user
router.route('/login').post(login);  // Login user
router.route('/logout').get(logout);  // Logout user
router.route('/:id/profile').get(verifyjwt, getProfile);  // Get user profile by ID (requires JWT verification)
router.route('/profile/edit').post(verifyjwt, upload.single('profilePhoto'), editProfile);
router.route('/suggested').get(verifyjwt, getSuggestedUsers);  // Get suggested users (requires JWT verification)
router.route('/followorunfollow/:id').post(verifyjwt, followOrUnfollow);  // Follow or unfollow user by ID (requires JWT verification)

export default router;



