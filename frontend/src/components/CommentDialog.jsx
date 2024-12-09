import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '../redux/postSlice';

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState('');
  const { selectedPost, posts } = useSelector(store => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText('');
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/post/${selectedPost?._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl p-0 flex flex-col backdrop-blur-xl bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-lg shadow-lg"
      >
        <div className="flex flex-1">
          <div className="w-full md:w-1/2">
            <img
              src={selectedPost?.image}
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between bg-gray-900 bg-opacity-50 rounded-r-lg">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage
                      src={selectedPost?.author?.profilePicture}
                      className="rounded-full"
                    />
                    <AvatarFallback className="text-white bg-indigo-600">CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-sm text-white">
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer text-white hover:text-indigo-400" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center bg-gray-800 rounded shadow-lg p-4">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold hover:bg-gray-700 rounded p-2">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full text-white hover:bg-gray-700 rounded p-2">
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr className="border-gray-700" />

            {/* Comments Section */}
            <div className="flex-1 overflow-y-auto max-h-96 p-4 space-y-3">
              {comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>

            {/* Input Section */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment..."
                  className="w-full outline-none border text-sm border-gray-600 bg-gray-800 text-white placeholder-gray-400 p-3 rounded-lg focus:border-indigo-400 focus:ring focus:ring-indigo-500"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg disabled:bg-gray-600 hover:bg-indigo-700"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
