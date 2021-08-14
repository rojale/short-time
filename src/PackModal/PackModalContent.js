import { useState } from "react";

export const BEFORE_OPEN = "BEFORE_OPEN";
export const VERIFYING = "VERIFYING";
export const VERIFIED = "VERIFIED";

const PackModalContent = () => {
  const [mode, setMode] = useState(BEFORE_OPEN);
  return <div>PackModalContent</div>;
};

export default PackModalContent;
