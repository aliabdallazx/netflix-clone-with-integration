import { useCallback } from 'react';
import { storage } from '../utils/helpers';

const ANALYTICS_KEY = 'netflix_analytics';
const SEARCH_HISTORY_KEY = 'netflix_search_history';
const VIEWED_MOVIES_KEY = 'netflix_viewed_movies';

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName, eventData = {}) => {
    const analytics = storage.get(ANALYTICS_KEY, []);
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data: eventData
    };
    analytics.push(event);
    
    // Keep only last 100 events
    if (analytics.length > 100) {
      analytics.shift();
    }
    
    storage.set(ANALYTICS_KEY, analytics);
  }, []);

  const getAnalytics = useCallback(() => {
    return storage.get(ANALYTICS_KEY, []);
  }, []);

  return { trackEvent, getAnalytics };
};

export const useSearchHistory = () => {
  const addSearchQuery = useCallback((query) => {
    if (!query || query.trim().length === 0) return;

    const history = storage.get(SEARCH_HISTORY_KEY, []);
    const newHistory = [{ query: query.trim(), timestamp: Date.now() }, ...history];
    
    // Keep only last 20 searches and remove duplicates
    const uniqueHistory = [];
    const seen = new Set();
    
    for (const item of newHistory) {
      if (!seen.has(item.query.toLowerCase())) {
        uniqueHistory.push(item);
        seen.add(item.query.toLowerCase());
        if (uniqueHistory.length >= 20) break;
      }
    }
    
    storage.set(SEARCH_HISTORY_KEY, uniqueHistory);
  }, []);

  const getSearchHistory = useCallback(() => {
    return storage.get(SEARCH_HISTORY_KEY, []);
  }, []);

  const clearSearchHistory = useCallback(() => {
    storage.remove(SEARCH_HISTORY_KEY);
  }, []);

  return { addSearchQuery, getSearchHistory, clearSearchHistory };
};

export const useViewedMovies = () => {
  const recordMovieView = useCallback((movie) => {
    const viewed = storage.get(VIEWED_MOVIES_KEY, []);
    const existing = viewed.findIndex(item => item.id === movie.id);
    
    if (existing !== -1) {
      viewed.splice(existing, 1);
    }
    
    viewed.unshift({ ...movie, viewedAt: Date.now() });
    
    // Keep only last 50 viewed movies
    if (viewed.length > 50) {
      viewed.pop();
    }
    
    storage.set(VIEWED_MOVIES_KEY, viewed);
  }, []);

  const getViewedMovies = useCallback(() => {
    return storage.get(VIEWED_MOVIES_KEY, []);
  }, []);

  const clearViewedMovies = useCallback(() => {
    storage.remove(VIEWED_MOVIES_KEY);
  }, []);

  return { recordMovieView, getViewedMovies, clearViewedMovies };
};

export default useAnalytics;
