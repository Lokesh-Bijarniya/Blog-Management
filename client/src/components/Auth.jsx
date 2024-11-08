import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const { login, signup, logout, user } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            if (isSignUp) {
                await signup(fname, lname, title, email, password);
                alert("Sign-up successful!");
            } else {
                await login(email, password);
                navigate('/');
            }
            // Clear form fields after a successful operation
            setFname('');
            setLname('');
            setTitle('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message || "An error occurred");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <>
                            <div>
                                <label className="block mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    className="w-full p-2 bg-gray-700 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    className="w-full p-2 bg-gray-700 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Title</label>
                                <select
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 bg-gray-700 rounded"
                                    required
                                >
                                    <option value="">Select Title</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 bg-gray-700 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 bg-gray-700 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                
                <button 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="mt-4 text-blue-400 hover:underline"
                >
                    {isSignUp 
                        ? "Already have an account? Sign In" 
                        : "Don't have an account? Sign Up"}
                </button>

                {user && (
                    <button 
                        onClick={() => logout()}
                        className="mt-4 text-red-400 hover:underline"
                    >
                        Log Out
                    </button>
                )}
            </div>
        </div>
    );
}
