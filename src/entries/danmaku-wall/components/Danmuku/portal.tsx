import React, { memo, useMemo } from "react";
import ReactDOM from "react-dom";

export default function portal(WrapComponent: React.FC<any>) {
  const Modal = function (props: any) {
    const container = useMemo(() => {
      let modalRoot = document.getElementById("screen");
      if (!modalRoot) {
        modalRoot = document.createElement("div");
        modalRoot.id = "screen";
        modalRoot.classList.add("screen");
        document.body.appendChild(modalRoot);
      }
      return modalRoot;
    }, []);
    //visible控制显示/隐藏
    return ReactDOM.createPortal(<WrapComponent {...props} container={container} />, container);
  };
  return memo(Modal);
}
