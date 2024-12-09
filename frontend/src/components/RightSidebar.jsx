import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div className="w-full max-w-xl mx-auto my-10 p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl border border-gray-700/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-4xl">
  <div className="flex items-center gap-4 sm:gap-6 relative">
    <Link to={`/profile/${user?._id}`} className="group">
      <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-gray-700 ring-4 ring-blue-500/30 hover:ring-blue-500/50 transition-all duration-300 group-hover:-translate-y-1">
        <AvatarImage 
          src={user?.profilePicture} 
          alt="profile_image" 
          className="object-cover group-hover:scale-110 transition-transform duration-300" 
        />
        <AvatarFallback className="bg-gradient-to-r from-gray-600 to-gray-700 text-white group-hover:scale-110 transition-transform duration-300">
          CN
        </AvatarFallback>
      </Avatar>
    </Link>
    <div className="flex flex-col space-y-1">
      <h1 className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-300 group-hover:translate-x-1">
        <Link to={`/profile/${user?._id}`} className="inline-block">
          {user?.username}
          <div className="h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </Link>
      </h1>
      <span className="text-gray-400 text-sm italic opacity-80 hover:opacity-100 transition-opacity">
        {user?.bio || 'Bio here...'}
      </span>
    </div>
  </div>
  <div className="mt-6 animate-fade-in">
    <SuggestedUsers />
  </div>
</div>
  )
}

export default RightSidebar