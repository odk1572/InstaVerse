import { Heart, Home, LogOut, MessageCircle, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '../redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);  // Log the error to check for any issues
            toast.error(error.response?.data?.message || "An error occurred during logout.");
        }
    };
    
    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        }
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ]
    return (
        <div className='fixed top-0 left-0 w-16 lg:w-64 h-screen bg-cyan-950 text-white shadow-xl z-10 transition-all duration-300'>
            <div className='flex flex-col'>
                {/* Logo */}
                <div className='flex justify-center my-8'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" className="w-full h-full transform transition-all duration-500 hover:scale-110">
  <defs>
    {/* Gradient Background with more colors */}
    <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style={{ stopColor: "#FFDD00", stopOpacity: 1 }} />
      <stop offset="20%" style={{ stopColor: "#FF6F00", stopOpacity: 1 }} />
      <stop offset="40%" style={{ stopColor: "#D500F9", stopOpacity: 1 }} />
      <stop offset="60%" style={{ stopColor: "#3D5AFE", stopOpacity: 1 }} />
      <stop offset="80%" style={{ stopColor: "#18FFFF", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#FF4081", stopOpacity: 1 }} />
    </linearGradient>

    {/* Gradient for Camera Lens */}
    <radialGradient id="lensGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#D500F9", stopOpacity: 0 }} />
    </radialGradient>

    {/* Glow Effect (Removed blur) */}
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feFlood floodColor="white" result="flood" />
      <feComposite in2="SourceAlpha" operator="in" result="composite2" />
    </filter>

    {/* Sparkle Effect for Flash */}
    <filter id="sparkle" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
    </filter>

    {/* Animated Glowing Halo around Text (Removed blur) */}
    <filter id="halo" x="-50%" y="-50%" width="200%" height="200%">
      <feFlood floodColor="white" result="flood" />
      <feComposite in2="SourceAlpha" operator="in" result="composite2" />
    </filter>

    {/* Keyframes for Animations */}
    <style>
      {`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scaleUp {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes bounceFlash {
          0% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-10px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.7; }
        }
      `}
    </style>
  </defs>

  {/* Logo Background with Colorful Gradient */}
  <rect x="100" y="50" width="400" height="400" rx="100" fill="url(#instaGradient)" className="animate-scaleUp" />

  {/* Camera Outline with Glow */}
  <circle cx="300" cy="250" r="130" fill="none" stroke="white" strokeWidth="40" filter="url(#glow)" className="animate-rotate" />

  {/* Camera Lens with Colorful Gradient and Animation */}
  <circle cx="430" cy="170" r="40" fill="url(#lensGradient)" stroke="white" strokeWidth="5" className="animate-pulse" />

  {/* Flash Effect with Sparkle */}
  <circle cx="270" cy="180" r="10" fill="white" opacity="0.7" className="animate-bounce animate-bounce flash" filter="url(#sparkle)" />

  {/* Handwritten-Style Text with Colorful Gradient */}
  <text
    x="300"
    y="480"
    fontFamily="'Comic Sans MS', 'Comic Neue', cursive"
    fontWeight="bold"
    fontSize="55"
    textAnchor="middle"
    fill="url(#instaGradient)"
    style={{
      paintOrder: "stroke",
      stroke: "white",
      strokeWidth: "2px",
    }}
    className="animate-pulse"
  >
    Instaverse
  </text>

  {/* Animated Glowing Halo around Text */}
  <circle cx="300" cy="480" r="60" fill="none" stroke="white" strokeWidth="4" opacity="0.3" className="animate-ping" filter="url(#halo)" />
</svg>

                </div>

                <div className='flex flex-col'>
                    {sidebarItems.map((item, index) => (
                        <div
                            onClick={() => sidebarHandler(item.text)}
                            key={index}
                            className='flex items-center gap-4 px-5 py-3 my-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-all duration-300 relative'>
                            {item.icon}
                            <span className='hidden lg:block text-lg'>{item.text}</span>

                            {/* Notification Popover */}
                            {item.text === "Notifications" && likeNotification.length > 0 && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size='icon' className="rounded-full h-6 w-6 bg-red-600 hover:bg-red-600 absolute top-0 right-0 text-xs font-bold">
                                            {likeNotification.length}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72 bg-[#2A2A2A] p-4 rounded-lg shadow-xl">
                                        <div>
                                            {likeNotification.length === 0 ? (<p>No new notifications</p>) : (
                                                likeNotification.map((notification) => (
                                                    <div key={notification.userId} className='flex items-center gap-3 my-2'>
                                                        <Avatar>
                                                            <AvatarImage src={notification.userDetails?.profilePicture} />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <p className='text-sm bg-cyan-950 text-white'>
                                                            <span className='text-white'>{notification.userDetails?.username}</span> liked your post
                                                        </p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Post Modal */}
            <CreatePost open={open} setOpen={setOpen} />
        </div>
    );
};

export default LeftSidebar;
