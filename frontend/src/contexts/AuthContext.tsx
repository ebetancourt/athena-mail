import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    login: () => void;
    logout: () => void;
}

export const defaultAuthContext: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = () => {
        console.log('Login function called');
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        window.location.href = `${backendUrl}/api/auth/google/login`;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
