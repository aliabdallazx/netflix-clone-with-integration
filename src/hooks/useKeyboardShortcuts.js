import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      Object.entries(shortcuts).forEach(([key, callback]) => {
        // Format: "Ctrl+K", "Shift+P", "Escape", etc.
        const parts = key.split('+');
        const requireCtrl = parts.includes('Ctrl');
        const requireShift = parts.includes('Shift');
        const requireAlt = parts.includes('Alt');
        const requireMeta = parts.includes('Meta');
        const targetKey = parts[parts.length - 1];

        const ctrlMatch = requireCtrl === e.ctrlKey;
        const shiftMatch = requireShift === e.shiftKey;
        const altMatch = requireAlt === e.altKey;
        const metaMatch = requireMeta === e.metaKey;
        const keyMatch = e.key === targetKey || e.code === targetKey;

        if (ctrlMatch && shiftMatch && altMatch && metaMatch && keyMatch) {
          e.preventDefault();
          callback(e);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
