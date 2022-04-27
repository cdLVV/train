/* eslint-disable jsx-a11y/alt-text */
import { memo } from "react";
import cn from "classnames";
import "./index.less";
/** https://github.com/aFarkas/lazysizes */
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

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
    srcSet,
    className,
    lazy = true,
    defaultSrc = placeholder,
    ...rest
  } = props;

  return (
    <img
      src={defaultSrc}
      data-src={src}
      data-srcset={srcSet}
      {...rest}
      className={cn(className, { lazyload: lazy })}
    />
  );
}

export default memo(LazyImage);
