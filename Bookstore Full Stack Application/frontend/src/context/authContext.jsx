import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// Create a Context
const AuthContext = createContext();

// Create a Provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // example of user state
  const [isLoading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        withCredentials: true
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;