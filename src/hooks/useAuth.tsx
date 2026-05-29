import React, { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
// import { doc, getDoc } from 'firebase/firestore';

type User = any;

interface AuthContextType {
  user: any | null;
  profile: any | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const login = (email: string) => {
    const mockUser = { uid: 'mock-123', email, photoURL: null };
    const mockProfile = { firstName: 'VEXA', lastName: 'Builder', role: 'LEARNER' };
    setUser(mockUser);
    setProfile(mockProfile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vxea_mock_user', JSON.stringify({ mockUser, mockProfile }));
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vxea_mock_user');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vxea_mock_user');
      if (saved) {
        try {
          const { mockUser, mockProfile } = JSON.parse(saved);
          setUser(mockUser);
          setProfile(mockProfile);
        } catch (e) {}
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
