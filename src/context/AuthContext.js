'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_USERS = [
  {
    id: "usr-1",
    nama: "AKP Bambang Hendarto",
    email: "admin@polsekdwikora.id",
    role: "Administrator",
    status: "Aktif",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-2",
    nama: "Bripka Syarifuddin",
    email: "operator@polsekdwikora.id",
    role: "Operator",
    status: "Aktif",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-3",
    nama: "Aiptu Hendra Wijaya",
    email: "petugas@polsekdwikora.id",
    role: "Petugas",
    status: "Aktif",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(MOCK_USERS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('polsek_dwikora_auth_user');
    const savedUsersList = localStorage.getItem('polsek_dwikora_users');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }

    if (savedUsersList) {
      try {
        setUsers(JSON.parse(savedUsersList));
      } catch (e) {
        setUsers(MOCK_USERS);
      }
    } else {
      localStorage.setItem('polsek_dwikora_users', JSON.stringify(MOCK_USERS));
    }

    setIsLoaded(true);
  }, []);

  const login = (email, password) => {
    // Demo login logic
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('polsek_dwikora_auth_user', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    } else {
      // Default fallback if credential doesn't match predefined list
      const defaultAdmin = users[0];
      setUser(defaultAdmin);
      localStorage.setItem('polsek_dwikora_auth_user', JSON.stringify(defaultAdmin));
      return { success: true, user: defaultAdmin };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('polsek_dwikora_auth_user');
  };

  const addUser = (newUser) => {
    const created = {
      id: `usr-${Date.now()}`,
      status: "Aktif",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      ...newUser
    };
    const updated = [...users, created];
    setUsers(updated);
    localStorage.setItem('polsek_dwikora_users', JSON.stringify(updated));
  };

  const updateUser = (id, fields) => {
    const updated = users.map(u => u.id === id ? { ...u, ...fields } : u);
    setUsers(updated);
    localStorage.setItem('polsek_dwikora_users', JSON.stringify(updated));
  };

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem('polsek_dwikora_users', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      isLoaded,
      login,
      logout,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
