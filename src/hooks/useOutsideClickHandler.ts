import {useEffect} from 'react';

export const useOutsideClickHandler = (
  ref: any,
  callback: () => void,
  shouldRegister: boolean = true,
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref &&
        typeof ref === 'object' &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }

      if (ref && typeof ref === 'string') {
        const el = document.querySelector(ref);
        if (el && !el.contains(event.target)) {
          callback();
        }
      }
    }

    if (shouldRegister) {
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, shouldRegister]);
};
