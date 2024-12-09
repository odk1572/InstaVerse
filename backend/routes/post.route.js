import express from "express";
import verifyjwt from "../middlewares/verifyjwt.js";
import upload from "../middlewares/multer.js";
import { addComment, addPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";
const router = express.Router();
router.route('/addpost').post(verifyjwt,upload.single('image'),addPost);
router.route('/all').get(verifyjwt,getAllPost);
router.route('/userpost/all').get(verifyjwt,getUserPost);
router.route('/:id/like').get(verifyjwt,likePost);
router.route('/:id/dislike').get(verifyjwt,dislikePost);
router.route("/:id/comment").post(verifyjwt, addComment); 
router.route("/:id/comment/all").post(verifyjwt, getCommentsOfPost);
router.route("/delete/:id").delete(verifyjwt, deletePost);
router.route("/:id/bookmark").get(verifyjwt, bookmarkPost);
export default router;




