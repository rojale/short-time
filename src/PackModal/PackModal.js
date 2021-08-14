import { useState, useCallback, useRef} from "react";
import classNames from "classnames";
import Modal from "react-modal";
import PackModalContent from "./PackModalContent";

import ownStyles from "./PackModal.module.css";

Modal.setAppElement("#root");

const OPEN = "OPEN";
const WILL_CLOSE = "WILL_CLOSE";
const CLOSING = "CLOSING";

const PackModal = ({ pack, closeModal }) => {
  const modalRef = useRef(null)
  const [openState, setOpenState] = useState(OPEN);
  const handleClose = useCallback(() => {
    setOpenState(CLOSING);
    // setTimeout(() => {
    //   closeModal();
    //   setOpenState(OPEN);
    // }, 300);
  }, [setOpenState]);

  return (
    <Modal
    ref={modalRef}
      isOpen={!!pack}
      onRequestClose={handleClose}
      className={ownStyles.container}
      overlayClassName={ownStyles.overlay}
    >
      <PackModalContent />
      <button onClick={handleClose} className={ownStyles.closeButton}>
        x
      </button>
    </Modal>
  );
};

export default PackModal;
