import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '../redux/postSlice'
import { Badge } from './ui/badge'
import { BookmarkCheck } from 'lucide-react';

const Post = ({ post }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
    const [comment, setComment] = useState(post.comments);
    const [bookmarked, setBookmarked] = useState(post.bookmarked || false);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:3000/api/v1/post/${post._id}/${action}`, { withCredentials: true });
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/post/delete/${post?._id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const bookmarkHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/post/${post?._id}/bookmark`, { withCredentials: true });
            if (res.data.success) {
                setBookmarked(!bookmarked);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl border-2 border-blue-800/30 overflow-hidden w-full max-w-md mx-auto transition-all duration-500 hover:shadow-4xl transform hover:-translate-y-2 hover:scale-[1.02]'>
            {/* Header */}
            <div className='px-4 py-3 flex items-center justify-between border-b dark:border-blue-700'>
                <div className='flex items-center space-x-3'>
                    <Avatar className='ring-2 ring-blue-400/50 hover:ring-blue-400/70 transition-all'>
                        <AvatarImage src={post.author?.profilePicture} alt="profile" className='object-cover' />
                        <AvatarFallback className='bg-gradient-to-r from-blue-700 to-blue-800 text-white'>
                            {post.author?.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex items-center space-x-2'>
                        <h1 className='font-semibold text-white'>{post.author?.username}</h1>
                        {user?._id === post.author._id && (
                            <Badge variant="outline" className='bg-blue-500/10 text-blue-400'>
                                Author
                            </Badge>
                        )}
                    </div>
                </div>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className='hover:bg-blue-700/20 dark:hover:bg-blue-800/60'>
                            <MoreHorizontal className='text-white' />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="space-y-2 text-center">
                        {post?.author?._id !== user?._id && (
                            <Button variant='ghost' className="w-full text-destructive hover:bg-destructive/10">
                                Unfollow
                            </Button>
                        )}
                        <Button variant='ghost' className="w-full">
                            Add to favorites
                        </Button>
                        {user && user?._id === post?.author._id && (
                            <Button 
                                onClick={deletePostHandler} 
                                variant='ghost' 
                                className="w-full text-destructive hover:bg-destructive/10"
                            >
                                Delete
                            </Button>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        
            {/* Post Image */}
            <div className='relative group'>
                <img
                    className='w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105'
                    src={post.image}
                    alt="post_img"
                />
                <div className='absolute inset-0 bg-black/0'></div>
            </div>
        
            {/* Actions */}
            <div className='px-4 py-3 space-y-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        {liked ? (
                            <FaHeart 
                                onClick={likeOrDislikeHandler} 
                                size={24} 
                                className='text-red-500 cursor-pointer hover:scale-110 transition-all' 
                            />
                        ) : (
                            <FaRegHeart 
                                onClick={likeOrDislikeHandler} 
                                size={24} 
                                className='text-neutral-500 cursor-pointer hover:text-neutral-100 hover:scale-110 transition-all' 
                            />
                        )}
                        <MessageCircle 
                            onClick={() => {
                                dispatch(setSelectedPost(post));
                                setOpen(true);
                            }} 
                            className='text-neutral-500 cursor-pointer hover:text-neutral-100 hover:scale-110 transition-all' 
                        />
                        <Send className='text-neutral-500 cursor-pointer hover:text-neutral-100 hover:scale-110 transition-all' />
                    </div>
                    {bookmarked ? (
                        <Bookmark
                            onClick={bookmarkHandler} 
                            className='text-blue-400 cursor-pointer hover:scale-110 transition-all' 
                        />
                    ) : (
                        <BookmarkCheck 
                            onClick={bookmarkHandler} 
                            className='text-neutral-500 cursor-pointer hover:text-neutral-100 hover:scale-110 transition-all' 
                        />
                    )}
                </div>
        
                {/* Likes */}
                <span className='block font-semibold text-white'>
                    {postLike} likes
                </span>
        
                {/* Caption */}
                <p className='text-neutral-300'>
                    <span className='font-semibold mr-2'>{post.author?.username}</span>
                    {post.caption}
                </p>
        
                {/* Comments */}
                {comment.length > 0 && (
                    <span 
                        onClick={() => {
                            dispatch(setSelectedPost(post));
                            setOpen(true);
                        }} 
                        className='block text-sm text-neutral-400 cursor-pointer hover:text-neutral-100 transition-colors'
                    >
                        View all {comment.length} comments
                    </span>
                )}
            </div>
        
            {/* Comment Input */}
            <div className='px-4 py-3 border-t dark:border-blue-700 flex items-center space-x-2'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    value={text}
                    onChange={changeEventHandler}
                    className='flex-grow outline-none text-sm bg-transparent text-neutral-100 placeholder-neutral-500'
                />
                {text && (
                    <span 
                        onClick={commentHandler} 
                        className='text-blue-400 font-semibold cursor-pointer hover:opacity-80 transition-opacity'
                    >
                        Post
                    </span>
                )}
            </div>
        
            <CommentDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Post;
