/* eslint-disable jsx-a11y/alt-text */
import React, { memo, useEffect, useRef, useState } from "react";
import cn from "classnames";
import "./index.less";

function loadImg(src: string) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      if (img.complete) {
        resolve(true);
      }
    };
    img.onerror = function () {
      resolve(false);
    };
    img.src = src;
  });
}

interface Props {
  src: string;
  defaultSrc?: string;
  lazy?: boolean;
  [key: string]: any;
}

const placeholder = require("./loading.gif");

function LazyImage(props: Props) {
  const {
    src,
    className,
    lazy = true,
    defaultSrc = placeholder,
    ...rest
  } = props;
  const [showSrc, setShowSrc] = useState(lazy ? defaultSrc : src);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (!lazy) return;

    // 兼容处理
    if (typeof IntersectionObserver === "function") {
      const handler = (entries: IntersectionObserverEntry[]) => {
        // 观察者
        entries.forEach((item) => {
          if (item.isIntersecting && isLoadingRef.current === false) {
            isLoadingRef.current = true;

            loadImg(src).then((flag) => {
              if (flag) {
                setShowSrc(src);

                // 防止重复监听
                imgRef.current && observer.unobserve(imgRef.current);
                observer.disconnect();
              }

              isLoadingRef.current = false;
            });
          }
        });
      };

      const observer = new IntersectionObserver(handler);

      imgRef.current && observer.observe(imgRef.current);

      return () => {
        observer.disconnect();
      };
    } else {
      // 如果不能observe图片，就降级处理，直接检查图片地址是否可用
      loadImg(src).then((flag) => {
        if (flag) {
          setShowSrc(src);
        }
      });
    }
  }, [defaultSrc, src, lazy]);

  return (
    <img
      src={showSrc}
      ref={imgRef}
      {...rest}
      className={cn(className, {
        "img-loaded": lazy && src === showSrc,
      })}
    />
  );
}

export default memo(LazyImage);
