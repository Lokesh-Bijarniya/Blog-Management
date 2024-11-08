import React from "react";
import Sidebar from "./components/Sidebar";
import BlogFeed from "./components/BlogFeed";
import TrendingBlogs from "./components/TrendingBlogs";
import Footer from "./components/Footer";
import {Routes, Route} from 'react-router-dom';
import CreateBlog from "./components/CreateBlog";
import Auth from "./components/Auth";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./components/Profile";

export default function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
                {/* Main content layout */}
                <div className="flex flex-grow w-full">
                    {/* Sidebar - Static */}
                    <div className="w-1/4">
                        <Sidebar />
                    </div>
                    
                    {/* Center Content - Dynamic based on route */}
                    <div className="flex-1 p-4">
                        <Routes>
                            <Route path="/" element={<BlogFeed />} />
                            <Route path="/createBlog" element={<CreateBlog />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </div>
                    
                    {/* TrendingBlogs - Static */}
                    <div className="w-1/4">
                        <TrendingBlogs />
                    </div>
                </div>

                {/* Footer - Static */}
                <Footer />
            </div>
        </AuthProvider>
    );
}
