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
  const isChangeJustNowRef = useRef(false);
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
          if (!isChangeJustNowRef.current) {
            setIndex((pre) => (pre < length - 1 ? pre + 1 : 0));
          }
          isChangeJustNowRef.current = false;
          fn();
        }, 5000);
      };
      fn();

      return () => id && clearTimeout(id);
    }
  }, [autoPlay, length]);

  const handleChange: React.MouseEventHandler<HTMLOListElement> = useCallback(
    (e) => {
      isChangeJustNowRef.current = true;
      // @ts-ignore
      const next = Number(e.target.dataset.slideTo);
      setIndex(next);
    },
    []
  );
  const handleToNext: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      isChangeJustNowRef.current = true;
      // @ts-ignore
      const direction = String(e.target.dataset.slideTo);
      console.log({ direction });

      if (direction === "next") {
        setIndex((pre) => (pre < length - 1 ? pre + 1 : 0));
      } else {
        setIndex((pre) => (pre === 0 ? length - 1 : pre - 1));
      }
    },
    [length]
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
      <ol className="swiper-indicators" onClick={handleChange}>
        {imgList.map((item, index) => (
          <li
            key={index}
            className={cn("swiper-indicators-item", {
              "swiper-indicators-item-active": currentIndex === index,
            })}
            data-slide-to={index}
          />
        ))}
      </ol>
      <button className="swiper-control" type="button" onClick={handleToNext}>
        <div className="swiper-control-icon" />
      </button>
      <button
        className="swiper-control swiper-control-next"
        type="button"
        data-slide-to="next"
        onClick={handleToNext}
      >
        <div
          className="swiper-control-icon swiper-control-next-icon"
          data-slide-to="next"
        />
      </button>
    </div>
  );
}

export default memo(Swiper);
