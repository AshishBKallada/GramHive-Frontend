import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const setLoading = (status) => {
        setIsLoading(status);
    };
return(
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
    { children }
    </LoadingContext.Provider >
);
};