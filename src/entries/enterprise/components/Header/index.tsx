/* eslint-disable jsx-a11y/anchor-is-valid */
import cn from "classnames";
import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import "./index.less";
import logoImg from "../../images/logo.png";

function Header(props: any) {
  const [isShow, setIsShow] = useState(false);
  const handleShow = useCallback(() => {
    setIsShow((pre) => !pre);
  }, []);
  return (
    <div className="header">
      <div className="header-content">
        <a className="header-left" href="/index.html">
          <img
            className="header-log"
            width="72px"
            height="36px"
            src={logoImg}
            alt="JOJO"
          />
        </a>
        <button
          className="header-navbar-toggler"
          type="button"
          onClick={handleShow}
        >
          <div className="header-navbar-toggler-icon" />
        </button>
        <div
          className={cn("header-collapse", {
            "header-collapse-not-show": !isShow,
          })}
        >
          <a href="/index.html">首页</a>
          <a href="/index.html">新闻</a>
          <a href="/index.html">关于我们</a>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
