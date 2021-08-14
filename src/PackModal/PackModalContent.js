import {
  useState,
  useEffect,
  useContext
} from "react";
import classNames from 'classnames';
import ClosedPack from "../Placeholders/ClosedPack";
import ownStyles from "./PackModalContent.module.css";
import OpenStateContext from "./OpenStateContext";
import { CLOSING } from "./PackModal";

export const INITIAL_MOUNT = "INITIAL_MOUNT";
export const PACK_ANIMATION = "PACK_ANIMATION";
export const BEFORE_OPEN = "BEFORE_OPEN";
export const VERIFYING = "VERIFYING";
export const VERIFIED = "VERIFIED";

const PackModalContent = ({ pack }) => {
  const openState = useContext(OpenStateContext)
  const [mode, setMode] = useState(INITIAL_MOUNT);

  const packTranslation = (() => {
    if (mode === INITIAL_MOUNT) {
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
    setMode(PACK_ANIMATION)
    })
  }, [setMode])

  useEffect(()=>{
    if (openState===CLOSING){
      setMode(INITIAL_MOUNT)
    }
  }, [openState])

  return (
    <div className={ownStyles.PackModalContent}>
      <div
        className={ownStyles.closedPackContainer}
        style={{ transform: packTranslation, transition: "transform 300ms" }}
      >
        <div className={getPackTitleClasses(mode)}>
          <span className={ownStyles.packTitle}>This is a title</span>
        </div>
        <ClosedPack />
      </div>
    </div>
  );
};

export default PackModalContent;

const createTranslateString = ({ x, y }) => `translate(${x}px,${y}px)`;

const getPackTitleClasses = mode=>classNames(ownStyles.packTitleContainer)