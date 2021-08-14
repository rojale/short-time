import { useEffect, useContext } from "react";
import OpenStateContext from "./OpenStateContext";
import { CLOSING } from "./PackModal";
import useAnimationForcer from "./useAnimationForcer";

const useOpenStateAnimationForcer = () => {
  const { elementRef, forceAnimation } = useAnimationForcer();

  const openState = useContext(OpenStateContext);

  useEffect(() => {
    if (openState === CLOSING) {
      forceAnimation();
    }
  }, [openState]);

  return elementRef;
};

export default useOpenStateAnimationForcer;
