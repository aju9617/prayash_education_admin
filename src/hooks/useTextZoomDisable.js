import { useEffect } from "react";

function useTextZoomDisable() {
  useEffect(() => {
    const addMaximumScaleToMetaViewport = () => {
      const el = document.querySelector("meta[name=viewport]");

      if (el !== null) {
        let content = el.getAttribute("content");
        // eslint-disable-next-line
        let re = /maximum\-scale=[0-9\.]+/g;

        if (re.test(content)) {
          content = content.replace(re, "maximum-scale=1.0");
        } else {
          content = [content, "maximum-scale=1.0"].join(", ");
        }

        el.setAttribute("content", content);
      }
    };

    const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

    const checkIsIOS = () =>
      // eslint-disable-next-line
      /iPad|iPhone|iPod|Mac/.test(navigator.userAgent) && !window.MSStream;

    if (checkIsIOS()) {
      disableIosTextFieldZoom();
    }
  }, []);
}

export default useTextZoomDisable;
