import { useRef, useCallback } from "react";

const useAnimationForcer = () => {
  const elementRef = useRef(null);
  const forceAnimation = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.classList.add("noAnim");
      void elementRef.current.offsetWidth;
      elementRef.current.classList.remove("noAnim");
    }
  }, [elementRef]);

  return { elementRef, forceAnimation };
};

export default useAnimationForcer;
