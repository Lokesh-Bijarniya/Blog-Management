import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for API requests

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/authors/login', { email, password });
            const userData = response.data.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };

    const signup = async (fname, lname, title, email, password) => {
        try {
            const response = await axios.post('/api/auth/signup', { fname, lname, title, email, password });
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            throw new Error(error.response?.data?.message || "Signup failed");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isLoggedIn = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
