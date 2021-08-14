import { useState, useCallback, useContext } from "react";
import classNames from "classnames";
import Modal from "react-modal";
import PackModalContent from "./PackModalContent";

import ownStyles from "./PackModal.module.css";
import OpenStateContext from "./OpenStateContext";
import useOpenStateAnimationForcer from "./useOpenStateAnimationForcer";

Modal.setAppElement("#root");

const OPEN = "OPEN";
export const CLOSING = "CLOSING";

const PackModal = ({ pack, closeModal }) => {
  const [openState, setOpenState] = useState(OPEN);
  const handleClose = useCallback(() => {
    setOpenState(CLOSING);
    window.setTimeout(() => {
      closeModal();
      setOpenState(OPEN);
    }, 300);
  }, [setOpenState]);

  return (
    <OpenStateContext.Provider value={openState}>
      <ModalComponent pack={pack} handleClose={handleClose} />
    </OpenStateContext.Provider>
  );
};

const ModalComponent = ({ pack, handleClose }) => {
  const openState = useContext(OpenStateContext);
  const closeButtonForcerRef = useOpenStateAnimationForcer();
  const overlayForcerRef = useOpenStateAnimationForcer();
  return (
    <Modal
      isOpen={!!pack}
      onRequestClose={handleClose}
      className={ownStyles.container}
      overlayClassName={classNames(
        ownStyles.overlay,
        openState === CLOSING && ownStyles.reverse
      )}
    >
      <div ref={overlayForcerRef} className={ownStyles.contentContainer}>
        {!!pack && <PackModalContent pack={pack} />}
        <button
          ref={closeButtonForcerRef}
          onClick={handleClose}
          className={ownStyles.closeButton}
        >
          x
        </button>
      </div>
    </Modal>
  );
};

export default PackModal;
