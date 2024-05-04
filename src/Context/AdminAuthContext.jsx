import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { createContext } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(null);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('adminToken');
        if (token) {
            setAdminToken(token);
        } else {
            setAdminToken(null); 
        }
        setAdminLoading(false);
    }, []); 

    return (
        <AdminAuthContext.Provider value={{ adminToken, setAdminToken, adminLoading }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
