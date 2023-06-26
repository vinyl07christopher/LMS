import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend API here
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setFetchedData(data);
        console.log(setFetchedData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <DataContext.Provider value={fetchedData}>{children}</DataContext.Provider>

    <h2>{fetchedData}</h2>

    </div>
  );
};
