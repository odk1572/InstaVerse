import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllMessage from '../hooks/useGetAllMessage'
import useGetRTM from '../hooks/useGetRTM'

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();
    const {messages} = useSelector(store=>store.chat);
    const {user} = useSelector(store=>store.auth);
    return (    
        <div className="overflow-y-auto flex-1 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
  <div className="flex justify-center mb-6">
    <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs w-full">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="text-xl font-semibold text-white">{selectedUser?.username}</span>
      <Link to={`/profile/${selectedUser?._id}`}>
        <Button className="h-10 mt-4 px-6 py-2 text-white bg-[#0095F6] hover:bg-[#318bc7] rounded-md transition-all">
          View Profile
        </Button>
      </Link>
    </div>
  </div>

  <div className="flex flex-col gap-4">
    {messages &&
      messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`p-3 rounded-lg max-w-xs break-words text-sm shadow-md transition-all ${
              msg.senderId === user?._id
                ? 'bg-[#1a73e8] text-white rounded-l-lg rounded-br-none'
                : 'bg-gray-700 text-white rounded-r-lg rounded-bl-none'
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}
  </div>
</div>

    )
}

export default Messages