import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '../hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="bg-gray-900 dark:bg-gray-800 min-h-screen ml-[10%] p-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-16 lg:gap-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <section className="flex justify-center items-center">
            <Avatar className="h-32 w-32 md:h-40 md:w-40">
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {userProfile?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-semibold">{userProfile?.username}</span>
                  {isLoggedInUserProfile ? (
                    <div className="flex gap-4">
                      <Link to="/account/edit">
                        <Button variant="outline" className="bg-blue-900 hover:bg-blue-700 text-white border-blue-500">
                          Edit Profile
                        </Button>
                      </Link>
                      <Button variant="outline" className="bg-blue-900 hover:bg-blue-600 text-white border-blue-600">
                        Follow
                      </Button>
                    </div>
                  ) : (
                    isFollowing ? (
                      <div className="flex gap-4">
                        <Button variant="outline" className="hover:bg-red-700 text-white">
                          Unfollow
                        </Button>
                        <Button variant="outline" className="hover:bg-gray-700 text-white">
                          Message
                        </Button>
                      </div>
                    ) : (
                      <Button className="bg-blue-900 hover:bg-blue-600 text-white">
                        Follow
                      </Button>
                    )
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-white">
                    <span className="font-semibold">{userProfile?.posts.length} </span>posts
                  </p>
                  <p className="text-white">
                    <span className="font-semibold">{userProfile?.followers.length} </span>followers
                  </p>
                  <p className="text-white">
                    <span className="font-semibold">{userProfile?.following.length} </span>following
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-white">
                {userProfile?.bio && (
                  <>
                    <span className="text-lg font-semibold">{userProfile?.bio}</span>
                    <Badge className="w-fit bg-gray-700 text-white">
                      <AtSign /> <span className="pl-1">{userProfile?.username}</span>
                    </Badge>
                  </>
                )}
                {!userProfile?.bio && (
                  <p className="text-gray-400">No bio provided</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-t-gray-700 pt-4">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${activeTab === "posts" ? "font-bold text-white" : "text-gray-400"}`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${activeTab === "saved" ? "font-bold text-white" : "text-gray-400"}`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedPost?.length ? (
              displayedPost.map((post) => (
                <div key={post?._id} className="relative group cursor-pointer">
                  <img
                    src={post.image || "https://via.placeholder.com/150"}
                    alt="post image"
                    className="rounded-sm w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white space-x-4">
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <Heart />
                        <span>{post?.likes?.length || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <MessageCircle />
                        <span>{post?.comments?.length || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
