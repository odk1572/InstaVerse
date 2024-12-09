
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '../redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '../redux/chatSlice';

const ChatPage = () => {


    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`https://instaverse-0jq1.onrender.com/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    },[]);

    return (
        <div className="flex ml-[10%] gap-0 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 shadow-2xl">
        {/* Sidebar Section */}
        <section
          className={`${
            isSidebarVisible ? 'w-full md:w-1/4' : 'hidden'
          } my-4 p-4 md:p-6 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700/50 transition-all duration-300 hover:shadow-xl md:block`}
        >
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-100 p-2 mb-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300"
          >
            Back
          </button>
          <h1 className="font-extrabold mb-4 md:mb-5 px-2 md:px-4 text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {user?.username}
          </h1>
          <hr className="mb-4 md:mb-5 border-gray-700/50" />
          <div className="overflow-y-auto h-[50vh] md:h-[75vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {suggestedUsers.map((suggestedUser) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              return (
                <div
                  key={suggestedUser?._id}
                  onClick={() => dispatch(setSelectedUser(suggestedUser))}
                  className="flex gap-3 md:gap-4 items-center p-3 md:p-4 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md"
                >
                  <Avatar className="w-12 h-12 md:w-16 md:h-16 ring-2 ring-offset-2 ring-offset-gray-900 transition-all duration-300 hover:ring-blue-500">
                    <AvatarImage src={suggestedUser?.profilePicture} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300">CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm md:text-xl text-gray-100 tracking-wide">
                      {suggestedUser?.username}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${
                        isOnline ? 'text-green-400 animate-pulse' : 'text-red-400'
                      }`}
                    >
                      {isOnline ? 'online' : 'offline'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
  
        {/* Chat Section */}
        {selectedUser ? (
          <section className="flex-1 border-l border-l-gray-700/30 flex flex-col h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
            <div className="flex gap-4 items-center px-6 py-5 border-b border-gray-700/30 sticky top-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm z-10">
              <Avatar className="ring-2 ring-blue-500/50 ring-offset-2 ring-offset-gray-900">
                <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300">CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {selectedUser?.username}
                </span>
              </div>
            </div>
            <Messages selectedUser={selectedUser} />
            <div className="flex items-center p-5 border-t border-t-gray-700/30 bg-gradient-to-tr from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 mr-3 py-3 px-5 rounded-xl border border-gray-600/50 bg-gray-700/30 text-gray-100 focus:ring-2 focus:ring-blue-500/70 transition-all duration-300 hover:border-blue-500/50"
                placeholder="Type a message..."
              />
              <Button
                onClick={() => sendMessageHandler(selectedUser?._id)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Send
              </Button>
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center mx-auto space-y-6">
            <MessageCircleCode className="w-40 h-40 my-6 text-gray-500 animate-bounce" />
            <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Your messages
            </h1>
            <span className="text-gray-400 text-xl tracking-wide">Send a message to start a chat.</span>
          </div>
        )}
      </div>
      
    )
}

export default ChatPage
