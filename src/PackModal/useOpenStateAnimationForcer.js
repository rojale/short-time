import { useEffect, useContext,} from "react";
import OpenStateContext from "./OpenStateContext";
import useAnimationForcer from "./useAnimationForcer";


const useOpenStateAnimationForcer = () => {
  const {elementRef, forceAnimation} = useAnimationForcer;

  const openState = useContext(OpenStateContext);

  useEffect(() => {
    forceAnimation()
  }, [openState]);

  return elementRef;
};

export default useOpenStateAnimationForcer;
