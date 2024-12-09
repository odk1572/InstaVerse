import sharp from "sharp/lib/index.js";
import cloudinary from "../utils/cloudinary.js";
import {Post} from "../models/post.model.js";
import {User} from "../models/user.model.js";
import {Comment} from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const addPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) return res.status(400).json({ message: 'Image required' });

        // image upload 
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: '-password' });

        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username, profilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username, profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};
export const likePost = async (req, res) => {
    try {
        const likerId = req.id;
        const postId = req.params.id; 
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found', success: false 
            });
        }

        await post.updateOne({ $addToSet: { likes: likerId } });
        await post.save();

         const user = await User.findById(likerId).select('username profilePicture');
         
         const postOwnerId = post.author.toString();
         if(postOwnerId !== likerId){
             const notification = {
                 type:'like',
                 userId:likerId,
                 userDetails:user,
                 postId,
                 message:'Your post was liked'
             }
             const postOwnerSocketId = getReceiverSocketId(postOwnerId);
             io.to(postOwnerSocketId).emit('notification', notification);
         }

        return res.status(200).json({
            message:'Post liked successfully', success:true
        });
    } catch (error) {
        console.log(error);        
    }
};

export const dislikePost = async (req, res) => {
    try {
        const likerId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({
            message: 'Post not found', 
            success: false 
        });

        await post.updateOne({ $pull: { likes: likerId } });
        await post.save();

         const user = await User.findById(likerId).select('username profilePicture');
         const postOwnerId = post.author.toString();
         if(postOwnerId !== likerId){
             const notification = {
                 type:'dislike',
                 userId:likeKrneWalaUserKiId,
                 userDetails:user,
                 postId,
                 message:'Your post was disliked'
            }
             const postOwnerSocketId = getReceiverSocketId(postOwnerId);
             io.to(postOwnerSocketId).emit('notification', notification);
         }
        return res.status(200).json({
            message:'Post disliked successfully', 
            success:true
        });
    } catch (error) {
        console.log(error);        
    }
};
export const addComment = async (req,res) =>{
    try {
        const postId = req.params.id;
        const commenterId = req.id;

        const {text} = req.body;

        const post = await Post.findById(postId);

        if(!text) return res.status(400).json({
            message:'please write something', 
            success:false
        });

        const comment = await Comment.create({
            text,
            author:commenterId,
            post:postId
        })

        await comment.populate({
            path:'author',
            select:"username profilePicture"
        });
        
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:'Comment is added successfully',
            comment,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getCommentsOfPost = async (req,res) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({post:postId})
        .populate('author', 'username profilePicture');

        if(!comments) {
            return res.status(404).json({
                message:'no comments found on this post', 
                success:false
            });
        }
        return res.status(200).json({success:true,comments});

    } catch (error) {
        console.log(error);
    }
};
export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({
                message:'Sorry, Post not found', 
                success:false
            });
        }

        if(post.author.toString() !== authorId){
            return res.status(403).json({
                message:'user not verified'
            });
        }
        await Post.findByIdAndDelete(postId);

        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            success:true,
            message:'Post is deleted successfuly'
        })
    } catch (error) {
        console.log(error);
    }
};
export const bookmarkPost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404)
            .json({
                message:'Sorry ,Post not found', 
                success:false
            });
        }
        const user = await User.findById(authorId);
        if(user.bookmarks.includes(post._id)){
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({
                type:'unsaved', 
                message:'Post is removed from bookmark successfully', 
                success:true
            });
        }else{
            await user.updateOne({
                $addToSet:{bookmarks:post._id}
            });
            await user.save();
            return res.status(200).json({
                type:'saved', 
                message:'Post is bookmarked successfully', 
                success:true
            });
        }
    } catch (error) {
        console.log(error);
    }
}