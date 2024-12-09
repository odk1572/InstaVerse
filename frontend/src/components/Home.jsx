import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '../hooks/useGetAllPost'
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    return (
        <div className="flex flex-col md:flex-row min-h-screen ml-[10%] bg-gray-900 text-white">
  {/* Main Content */}
  <div className="flex-grow flex flex-col md:flex-row">
    <div className="w-full md:w-2/3 p-4">
      <Feed />
    </div>
    <div className="w-full md:w-1/3 p-4">
      <Outlet />
    </div>
  </div>

  {/* Right Sidebar */}
  <aside className="w-full md:w-1/4 ml-[1%] bg-gray-800 border-l border-gray-700 p-4">
    <RightSidebar />
  </aside>
</div>

    )
}

export default Home