import React, { memo } from "react";
import cn from "classnames";
import "./index.less";

export interface CardData {
  url: string;
  name: string;
  img: string;
}
interface Props extends CardData {
  className: string;
}

function Card(props: Props) {
  const { className, name, img, url } = props;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn("card text-center", className)}
    >
      <img src={img} alt={name} />
      <span>{name}</span>
    </a>
  );
}
export default memo(Card);
