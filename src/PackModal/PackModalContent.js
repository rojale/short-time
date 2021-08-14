import {
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
  useEffect,
} from "react";
import ClosedPack from "../Placeholders/ClosedPack";
import ownStyles from "./PackModalContent.module.css";

export const INITIAL_ANIMATION = "INITIAL_ANIMATION";
export const BEFORE_OPEN = "BEFORE_OPEN";
export const VERIFYING = "VERIFYING";
export const VERIFIED = "VERIFIED";

const PackModalContent = ({ pack }) => {
  const [mode, setMode] = useState(INITIAL_ANIMATION);

  const packTranslation = (() => {
    if (mode === INITIAL_ANIMATION) {
      return createTranslateString({
        // eyeballed modal padding and element layout
        // should just use clientBoundingRect on ref of container
        x: pack.animationArgs.x - 50,
        y: pack.animationArgs.y - 90,
      });
    } else {
      return createTranslateString({ x: 0, y: 0 });
    }
  })();

  useEffect(()=>{
    window.requestAnimationFrame(()=>{
    setMode(BEFORE_OPEN)
    })
  }, [setMode])

  return (
    <div className={ownStyles.PackModalContent}>
      <div
        className={ownStyles.closedPackContainer}
        style={{ transform: packTranslation, transition: "transform 300ms" }}
      >
        <div className={ownStyles.packTitleContainer}>
          <span className={ownStyles.packTitle}>This is a title</span>
        </div>
        <ClosedPack />
      </div>
    </div>
  );
};

export default PackModalContent;

const createTranslateString = ({ x, y }) => `translate(${x}px,${y}px)`;
