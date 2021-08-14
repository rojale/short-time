import { useEffect, useContext, useCallback, useReducer } from "react";
import classNames from "classnames";
import ClosedPack from "../Placeholders/ClosedPack";
import ownStyles from "./PackModalContent.module.css";
import OpenStateContext from "./OpenStateContext";
import { CLOSING } from "./PackModal";
import useAnimationForcer from "./useAnimationForcer";

export const INITIAL_MOUNT = "INITIAL_MOUNT";
export const PACK_ANIMATION = "PACK_ANIMATION";
export const BEFORE_OPEN = "BEFORE_OPEN";
export const VERIFY_STARTED = "VERIFY_STARTED";
export const VERIFYING = "VERIFYING";
export const VERIFIED = "VERIFIED";
export const ANIMATING_CLOSE = "ANIMATING_CLOSE";

const PackModalContent = ({ pack }) => {
  const openState = useContext(OpenStateContext);

  const {
    elementRef: packDetailsRef,
    forceAnimation: forcePackDetailsAnimation,
  } = useAnimationForcer();
  const { elementRef: packTextRef, forceAnimation: forcePackTextsAnimation } =
    useAnimationForcer();

  const [mode, dispatchModeAction] = useReducer(modeReducer, INITIAL_MOUNT);

  const setMode = useCallback(
    (newMode) => {
      dispatchModeAction({ type: SET, newMode });
    },
    [dispatchModeAction]
  );

  const transitionMode = useCallback(() => {
    dispatchModeAction({ type: TRANSITION_NEXT });
  }, [dispatchModeAction]);

  const packTranslation = (() => {
    if ([INITIAL_MOUNT, ANIMATING_CLOSE].includes(mode)) {
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

  useEffect(() => {
    window.requestAnimationFrame(() => {
      setMode(PACK_ANIMATION);
    });
  }, [setMode]);

  useEffect(() => {
    if (openState === CLOSING) {
      setMode(ANIMATING_CLOSE);
    }
  }, [openState, setMode]);

  return (
    <div className={ownStyles.PackModalContent}>
      <div
        onTransitionEnd={transitionMode}
        className={getClosedPackClasses(mode)}
        style={{ transform: packTranslation, transition: "transform 300ms" }}
      >
        <div className={getPackTitleClasses(mode)}>
          <span className={ownStyles.packTitle}>This is a title</span>
        </div>
        <div style={{ position: "relative" }}>
          <ClosedPack />
          <div style={{ position: "absolute", zIndex: 1, top: 0, left: 0 }}>
            <ClosedPack />
          </div>
        </div>
      </div>
      <div className={ownStyles.packDetails}>
        <div
          // eyeballed spacer - could instead use something like grid
          style={{ height: 50 }}
        />
        <div ref={packDetailsRef} className={getPackDetailsClasses(mode)}>
          <p className={ownStyles.packTitle} style={{ marginBottom: 15 }}>
            This is a title
          </p>
          <p style={{ marginBottom: 30 }}># of Videos</p>
          <p style={{ marginBottom: 15 }}>Description</p>
          <p
            ref={packTextRef}
            className={getPackTextClasses(mode)}
            style={{ marginBottom: 30 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={{ marginBottom: 15 }}>Creators</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                height: 120,
                width: 120,
                border: "1px black solid",
                marginRight: 20,
              }}
            />
            <div
              style={{
                height: 120,
                width: 120,
                border: "1px black solid",
                marginRight: 20,
              }}
            />
            <div
              style={{ height: 120, width: 120, border: "1px black solid" }}
            />
            <div />
          </div>
        </div>
        <button
        onAnimationEnd={transitionMode}
          onClick={() => {
            setMode(VERIFY_STARTED);
            forcePackDetailsAnimation();
            forcePackTextsAnimation();
          }}
          className={getOpenButtonClasses(mode)}
        >
          {[VERIFY_STARTED, VERIFYING].includes(mode) ? "X" : "OPEN PACK"}
        </button>
      </div>
    </div>
  );
};

export default PackModalContent;

const createTranslateString = ({ x, y }) => `translate(${x}px,${y}px)`;

const getClosedPackClasses = mode=>classNames(ownStyles.closedPackContainer, [VERIFYING, VERIFIED].includes(mode) && ownStyles.closedPackVerifying)

const getPackTitleClasses = (mode) =>
  classNames(
    ownStyles.packTitleContainer,
    ![PACK_ANIMATION, INITIAL_MOUNT].includes(mode) && ownStyles.packTitleAnim
  );

const getPackDetailsClasses = (mode) =>
  classNames(
    ownStyles.packTextContainer,
    ![PACK_ANIMATION, INITIAL_MOUNT].includes(mode) &&
      ownStyles.packTextContainerAnim,
    [VERIFY_STARTED, VERIFYING, VERIFIED].includes(mode) &&
      ownStyles.reversePackInfo
  );

const getPackTextClasses = (mode) =>
  classNames(
    ![PACK_ANIMATION, INITIAL_MOUNT].includes(mode) && ownStyles.packTextAnim,
    [VERIFY_STARTED, VERIFYING, VERIFIED].includes(mode) &&
      ownStyles.reversePackInfo
  );

const getOpenButtonClasses = (mode) =>
  classNames(
    ownStyles.openButton,
    ![PACK_ANIMATION, INITIAL_MOUNT].includes(mode) &&
      ownStyles.packTextContainerAnim,
    [VERIFY_STARTED, VERIFYING].includes(mode) && ownStyles.openButtonActive,
    [VERIFIED, ANIMATING_CLOSE].includes(mode) && ownStyles.openButtonHidden
  );

const SET = "SET";
const TRANSITION_NEXT = "TRANSITION_NEXT";
const modeReducer = (currentMode = INITIAL_MOUNT, action) => {
  switch (action.type) {
    case SET: {
      return action.newMode;
    }
    case TRANSITION_NEXT: {
      switch(currentMode){
        case PACK_ANIMATION:{
        return BEFORE_OPEN;

        }
        case VERIFY_STARTED: {
          return VERIFYING;

        }
        default:{
          return currentMode;
        }

      }
    }
    default: {
      return currentMode;
    }
  }
};
