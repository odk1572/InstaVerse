
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        <div className="my-10 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
  <div className="flex items-center justify-between text-sm">
    <h1 className="font-semibold text-gray-300">Suggested for you</h1>
    <span className="font-medium cursor-pointer text-blue-400 hover:text-blue-500">See All</span>
  </div>

  {suggestedUsers.map((user) => (
    <div key={user._id} className="flex items-center justify-between my-5 p-4 bg-gray-700 rounded-lg hover:bg-gray-600">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-gray-700">
            <AvatarImage src={user?.profilePicture} alt="profile_image" />
            <AvatarFallback className="bg-gray-600 text-white">Null</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="text-sm font-semibold text-blue-400 hover:text-blue-500">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-gray-400 text-xs">{user?.bio || 'Bio here...'}</span>
        </div>
      </div>
      <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]">
        Follow
      </span>
    </div>
  ))}
</div>

    )
}

export default SuggestedUsers
