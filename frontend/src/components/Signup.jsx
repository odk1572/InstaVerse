import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
function Signup() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/v1/user/register', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: ""
        });
      }
    } catch (error) {
      // Correct way to access error data
      console.error(error.response?.data || error.message);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl mx-auto">
        {/* Logo Section - Creative Positioning */}
        <div className="hidden md:flex items-center justify-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
          
          <div className="z-10 transform hover:scale-110 transition-transform duration-500 ease-in-out">
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
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center px-6 py-12">
          <form
            onSubmit={signupHandler}
            className="bg-gray-800/60 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 flex flex-col gap-6 p-10 w-full max-w-md"
          >
            <div className="text-center mb-6 md:hidden">
              <div className="w-24 h-24 mx-auto">
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
            </div>

            <h2 className="text-3xl font-bold text-white text-center mb-4 tracking-wider">
              Create Your Account
            </h2>
            <p className="text-sm text-center text-gray-400 mb-6">
              Join Instaverse and connect with the world
            </p>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={input.username}
                  onChange={changeEventHandler}
                  className="w-full bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 rounded-xl p-3 outline-none border border-white/10 transition-all duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="w-full bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 rounded-xl p-3 outline-none border border-white/10 transition-all duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="w-full bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 rounded-xl p-3 outline-none border border-white/10 transition-all duration-300"
                />
              </div>
            </div>

            {
                    loading ? (
                        <button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </button>
                    ) : (
                        <button type='submit' 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl py-3 mt-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl" >Signup</button>
                    )
                }

            <div className="text-center text-sm text-gray-400 mt-4">
              Already have an account? 
              <Link to="/login" className='text-blue-600'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
