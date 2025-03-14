import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = () => {
        window.location.href = 'http://localhost:8000/api/auth/google/login';
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Decode JWT and set user info
            // You might want to add token validation here
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
