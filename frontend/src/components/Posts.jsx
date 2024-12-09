import React from "react";
import Post from "./Post"; // Ensure Post component is working correctly
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((state) => state.post);

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="bg-gray-900 dark:bg-gray-800 min-h-screen p-4">
  {posts.map((post) => (
    <Post key={post._id} post={post} />
  ))}
</div>

  );
};

export default Posts;
