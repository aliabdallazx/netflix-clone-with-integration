import { useState } from 'react';
import { storage } from '../utils/helpers';

const FAVORITES_KEY = 'netflix_favorites';
const WATCHLIST_KEY = 'netflix_watchlist';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return storage.get(FAVORITES_KEY, []);
  });

  const addFavorite = (movie) => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    storage.set(FAVORITES_KEY, updated);
  };

  const removeFavorite = (movieId) => {
    const updated = favorites.filter(fav => fav.id !== movieId);
    setFavorites(updated);
    storage.set(FAVORITES_KEY, updated);
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    return storage.get(WATCHLIST_KEY, []);
  });

  const addToWatchlist = (movie) => {
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    storage.set(WATCHLIST_KEY, updated);
  };

  const removeFromWatchlist = (movieId) => {
    const updated = watchlist.filter(item => item.id !== movieId);
    setWatchlist(updated);
    storage.set(WATCHLIST_KEY, updated);
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(item => item.id === movieId);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};

export default useFavorites;
