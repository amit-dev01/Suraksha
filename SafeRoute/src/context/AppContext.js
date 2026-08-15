import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sosActive, setSosActive] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  return (
    <AppContext.Provider value={{ sosActive, setSosActive, currentLocation, setCurrentLocation }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
