import { useState } from "react";

function useDiscloser(initialState = false) {
  const [isOpen, setOpen] = useState(initialState);

  const toggle = () => {
    setOpen((e) => !e);
  };

  return { isOpen, setOpen, toggle };
}

export default useDiscloser;
