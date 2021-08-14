import { useEffect, useContext, useRef } from "react";
import OpenStateContext from "./OpenStateContext";

const useOpenStateAnimationForcer = () => {
  const elementRef = useRef(null);

  const openState = useContext(OpenStateContext);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.animation = "none";
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.style.animation = "";
        }
      }, 0);
    }
  }, [openState]);

  return elementRef;
};

export default useOpenStateAnimationForcer;
