import cn from "classnames";
import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import "./index.less";

interface Iprops {
  defaultIndex: number;
  imgList: string[];
  autoPlay?: boolean;
}
function Swiper(props: Iprops) {
  const { defaultIndex = 0, imgList = [], autoPlay = false } = props;
  const [currentIndex, setIndex] = useState(defaultIndex);
  const preRef = useRef<number>(currentIndex);
  useEffect(() => {
    setIndex(defaultIndex);
  }, [defaultIndex]);

  const length = imgList.length;

  useEffect(() => {
    preRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (autoPlay) {
      let id: NodeJS.Timeout;
      const fn = () => {
        id = setTimeout(() => {
          setIndex((pre) => (pre < length - 1 ? pre + 1 : 0));
          fn();
        }, 5000);
      };
      fn();

      return () => id && clearTimeout(id);
    }
  }, [autoPlay, length]);

  const handleChange: React.MouseEventHandler<HTMLOListElement> = useCallback(
    (e) => {
      // @ts-ignore
      const next = Number(e.target.dataset.slideTo);
      setIndex(next);
    },
    []
  );

  return (
    <div className="swiper">
      <ul>
        {imgList.map((val: string, index) => {
          const left = currentIndex === 0 && index === length - 1;
          const right = currentIndex === length - 1 && index === 0;

          return (
            <li
              key={val}
              className={cn({
                "swiper-item-cur": currentIndex === index,
                "swiper-item-right": (currentIndex < index && !left) || right,
                "swiper-item-left": (currentIndex > index && !right) || left,
                "swiper-item-top":
                  preRef.current === index || currentIndex === index,
              })}
            >
              <img key={val} src={val} alt="" />
            </li>
          );
        })}
      </ul>
      <ol className="carousel-indicators" onClick={handleChange}>
        {imgList.map((item, index) => (
          <li
            key={index}
            className={cn("carousel-indicators-item", {
              "carousel-indicators-item-active": currentIndex === index,
            })}
            data-slide-to={index}
            data-target="#carousel-example-generic"
          />
        ))}
      </ol>
    </div>
  );
}

export default memo(Swiper);
