import { useEffect, useRef } from 'react';

export const useProctor = ({ onViolation, maxViolations = 3 }) => {
  const violationCount = useRef(0);

  useEffect(() => {
    // Disable right-click
    const blockRightClick = (e) => e.preventDefault();
    document.addEventListener('contextmenu', blockRightClick);

    // Disable copy-paste
    const blockCopy = (e) => e.preventDefault();
    document.addEventListener('copy', blockCopy);
    document.addEventListener('cut', blockCopy);
    document.addEventListener('paste', blockCopy);

    // Tab / window switch detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        violationCount.current += 1;
        onViolation({ type: 'tab_switch', count: violationCount.current });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Window blur detection
    const handleBlur = () => {
      violationCount.current += 1;
      onViolation({ type: 'window_blur', count: violationCount.current });
    };
    window.addEventListener('blur', handleBlur);

    // Block keyboard shortcuts (Ctrl+C, Ctrl+V, Alt+Tab, F12)
    const blockKeys = (e) => {
      if (
        (e.ctrlKey && ['c', 'v', 'x', 'u', 's', 'a'].includes(e.key.toLowerCase())) ||
        (e.altKey && e.key === 'Tab') ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        onViolation({ type: 'keyboard_shortcut', key: e.key });
      }
    };
    document.addEventListener('keydown', blockKeys);

    return () => {
      document.removeEventListener('contextmenu', blockRightClick);
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('cut', blockCopy);
      document.removeEventListener('paste', blockCopy);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('keydown', blockKeys);
    };
  }, [onViolation, maxViolations]);

  return violationCount.current;
};
