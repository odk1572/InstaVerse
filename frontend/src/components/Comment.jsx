import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Comment = ({ comment }) => {
    return (
        <div className='my-4'>
            <div className='flex gap-4 items-start bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors'>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={comment?.author?.profilePicture} />
                    <AvatarFallback>{comment?.author.username[0]}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <h1 className='font-semibold text-sm text-white'>{comment?.author.username}</h1>
                    <p className='text-sm text-gray-300 mt-1'>{comment?.text}</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;
