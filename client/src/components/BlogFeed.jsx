import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import SearchIcon from '@mui/icons-material/Search';

export default function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/blogs/getBlog");
        console.log("API Response:", response.data); // Check the response structure
        setPosts(response.data.data || []); // Ensure posts is set to an array
        setLoading(false);
      } catch (err) {
        setError("Failed to load posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full bg-gray-900 flex flex-col p-2">
      <div className="flex rounded mb-4 bg-gray-700 p-3">
        <SearchIcon className="text-gray-400"/>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-700 outline-none text-white"
        />
      </div>
      
      {filteredPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
