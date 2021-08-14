import { useRef, useCallback } from "react";

const useAnimationForcer = () => {
  const elementRef = useRef(null);
  const forceAnimation = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.animation = "none";
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.style.animation = "";
        }
      }, 0);
    }
  }, [elementRef]);

  return { elementRef, forceAnimation };
};

export default useAnimationForcer;
