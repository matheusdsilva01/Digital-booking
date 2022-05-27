import { createContext, useState, useEffect } from 'react';
import api from '../services';
import React from 'react';

const Context = createContext()

function Auth({ children }) {
    const [logado, setLogado] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token.replace(/['"]+/g, '')}`;
            setLogado(true);
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = '';
        setLogado(false);
    }
    const handleLogin = (token, user) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setLogado(true);
    }


    return (
        <Context.Provider value={{ logado, handleLogout, handleLogin }}>
            {children}
        </Context.Provider>

    )
}

export { Context, Auth };