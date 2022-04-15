/* eslint-disable jsx-a11y/anchor-is-valid */
import cn from "classnames";
import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import "./index.less";
import logoImg from "../../images/logo.png";

function Header(props: any) {

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
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="true"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="header-collapse">
          <a href="/index.html">首页</a>
          <a href="/index.html">新闻</a>
          <a href="/index.html">关于我们</a>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
