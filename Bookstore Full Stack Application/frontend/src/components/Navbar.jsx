import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // A POST request is meant for actions that change the server’s state, like creating, updating, or deleting resources. Logging out is an action that involves changing the state by invalidating a session or removing a token, so a POST is more appropriate.
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
                withCredentials: true
            });
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="fixed top-0 w-full bg-blue-600  text-white p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">BookStore Manager</Link>
                <div className="flex items-center">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2"
                            >
                                <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                                    <span className="text-blue-800 font-bold">{user.email[0].toUpperCase()}</span>
                                </div>
                                <span>{user.email}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;