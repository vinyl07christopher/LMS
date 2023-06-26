import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user');
        const userData = response.data;
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};
