import { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: null,
  email: null,
  username: null,
  firstName: null,
  lastName: null,
  profileImage: null,
  isLoggedIn: false,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const savedUser = storage.get('netflix_user', null);
    if (savedUser && savedUser.isLoggedIn) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const register = (email, username, password, firstName, lastName, profileImage = null) => {
    // In a real app, this would call a backend API
    // For now, we'll simulate it with localStorage
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      firstName,
      lastName,
      profileImage: profileImage || `https://i.pravatar.cc/150?u=${email}`,
      isLoggedIn: true,
      password: password, // Note: Never store plain passwords in production
    };

    storage.set('netflix_user', newUser);
    setUser(newUser);
    return newUser;
  };

  const login = (emailOrUsername, password) => {
    // In a real app, this would call a backend API
    const savedUser = storage.get('netflix_user', null);

    if (
      savedUser &&
      (savedUser.email === emailOrUsername || savedUser.username === emailOrUsername) &&
      savedUser.password === password
    ) {
      const loggedInUser = { ...savedUser, isLoggedIn: true };
      storage.set('netflix_user', loggedInUser);
      setUser(loggedInUser);
      return { success: true, user: loggedInUser };
    }

    return { success: false, error: 'Invalid email/username or password' };
  };

  const logout = () => {
    storage.remove('netflix_user');
    setUser(DEFAULT_USER);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    storage.set('netflix_user', updatedUser);
    setUser(updatedUser);
    return updatedUser;
  };

  const isUserLoggedIn = () => {
    return user.isLoggedIn;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        register,
        login,
        logout,
        updateProfile,
        isUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
