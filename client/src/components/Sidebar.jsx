import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import according to your file structure

export default function Sidebar() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className="hidden h-screen sticky top-0 md:flex flex-col bg-black p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Blog</h1>
      <nav className="flex flex-col space-y-4 justify-center">
        
        {/* Explore Link */}
        <Link to='/' className="text-gray-400 hover:text-white flex gap-1">
          <ExploreIcon /> Explore
        </Link>

        {/* Create Blog Link */}
        <Link to='/createBlog' className="text-gray-400 hover:text-white flex gap-1">
          <AddCircleIcon /> Create Blog
        </Link>
        
        {isLoggedIn() ? (
          // If logged in, show Profile and Logout buttons
          <>
            <Link to="/profile" className="text-gray-400 hover:text-white flex gap-1">
              <PersonIcon /> Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="text-gray-400 border border-blue-700 rounded-full p-2 hover:text-white flex gap-1"
            >
              <LogoutIcon /> Logout
            </button>
          </>
        ) : (
          // If not logged in, show Sign In button
          <>
            <Link 
              to="/auth"
              className="text-gray-400 border border-blue-700 rounded-full p-2 hover:text-white flex justify-center gap-1"
            >
              <AccountCircleIcon /> Sign In
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
