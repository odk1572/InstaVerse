import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '../lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const {posts} = useSelector(store=>store.post);
    const dispatch = useDispatch();
  
    const fileChangeHandler = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const dataUrl = await readFileAsDataURL(file);
        setImagePreview(dataUrl);
      }
    }
  
    const createPostHandler = async (e) => {
      const formData = new FormData();
      formData.append("caption", caption);
      if (imagePreview) formData.append("image", file);
      try {
        setLoading(true);
        const res = await axios.post('https://instaverse-0jq1.onrender.com/api/v1/post/addpost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setPosts([res.data.post, ...posts]));// [1] -> [1,2] -> total element = 2
          toast.success(res.data.message);
          setOpen(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  


  return (
    <Dialog open={open}>
    <DialogContent onInteractOutside={() => setOpen(false)} className="bg-gray-800 text-white rounded-lg shadow-xl p-6 max-w-lg mx-auto">
      <DialogHeader className="text-center font-semibold text-2xl text-white mb-4">Create New Post</DialogHeader>
      <div className="flex gap-4 items-center mb-4">
        <Avatar>
          <AvatarImage src={user?.profilePicture} alt="profile picture" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg text-white">{user?.username}</h1>
          <span className="text-gray-400 text-sm">{user?.bio}</span>
        </div>
      </div>
      <Textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="focus-visible:ring-transparent border-2 border-gray-600 text-white bg-gray-700 p-3 rounded-md w-full placeholder-gray-400 mt-3 transition-all duration-300 ease-in-out hover:border-gray-400"
        placeholder="Write a caption..."
      />
      {imagePreview && (
        <div className="w-full h-64 flex items-center justify-center mt-4 rounded-lg overflow-hidden">
          <img src={imagePreview} alt="preview_img" className="object-cover h-full w-full hover:scale-110 transition-all duration-300" />
        </div>
      )}
      <input ref={imageRef} type="file" className="hidden" onChange={fileChangeHandler} />
      <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] mt-4 text-white-800 transition-colors duration-300 rounded-lg py-2 px-4">
        Browse
      </Button>
      {imagePreview && (
        loading ? (
          <Button className="mt-4 bg-gray-600 text-white hover:bg-gray-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button onClick={createPostHandler} type="submit" className="w-full mt-4 bg-[#0095F6] hover:bg-[#258bcf] py-3 text-white rounded-lg transition-colors duration-300">
            Post
          </Button>
        )
      )}
    </DialogContent>
  </Dialog>  
  );
};

export default CreatePost;
