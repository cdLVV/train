import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
// import cn from "classnames";
import "./index.less";
import portal from "./portal";
import { random, randomColor } from "./utils";
// import { root } from "../..";
import ReactDOM from "react-dom/client";
// import ReactDOM2 from "react-dom";

interface Props {
  words: string;
  container?: HTMLDivElement | null;
  duration?: number;
  onEnd?: (val?: any) => any;
}

function Component(props: Props) {
  const { words, container, duration, onEnd } = props;
  const [style, setStyle] = useState<React.CSSProperties>();
  const eleRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef((duration || random(5, 10)) * 1000);
  const [status, setStatus] = useState<"move" | "pause">("move");
  const lastTimeRef = useRef(0);
  const useTimeRef = useRef(0);
  const totalRef = useRef(0);

  useEffect(() => {
    const ele = eleRef.current;
    const containerEle =
      container || (document.getElementById("screen") as HTMLDivElement);
    if (ele && containerEle) {
      const fontSize = random(14, 28);
      const color = randomColor();
      const right = -ele.clientWidth;
      const top = random(0, containerEle.clientHeight - ele.clientHeight);
      setStyle({
        fontSize,
        color,
        right,
        top,
      });
      totalRef.current = containerEle.clientWidth - right;
    }
  }, [container]);

  useEffect(() => {
    const ele = eleRef.current;
    if (status === "pause") {
      return;
    }
    if (ele && container) {
      const total = totalRef.current;
      let time = durationRef.current;
      let currentX = 0;
      let id = 0;
      const step: FrameRequestCallback = (timestamp) => {
        // const timestamp = +new Date()
        lastTimeRef.current = lastTimeRef.current || timestamp;

        let lastTime = lastTimeRef.current;
        let useTime = useTimeRef.current;

        useTime = useTime + timestamp - lastTime;

        currentX = (total * useTime) / time;
        // console.log({ time, useTime, timestamp, lastTime, total, currentX });

        // 确保元素刚好停在total的位置
        currentX = Math.min(currentX, total);
        ele.style.transform = "translateX(-" + currentX + "px)";
        lastTimeRef.current = timestamp;
        useTimeRef.current = useTime;

        if (useTime < time) {
          // 在五秒后停止动画
          id = requestAnimationFrame(step);
        } else {
          setTimeout(() => {
            onEnd && onEnd();
          }, 0);
        }
      };

      id = requestAnimationFrame(step);

      return () => {
        id && cancelAnimationFrame(id);
      };
    }
  }, [container, onEnd, status]);

  const handleFocus = useCallback(() => {
    setStatus("pause");
  }, []);
  const handleUnFocus = useCallback(() => {
    setStatus("move");
    lastTimeRef.current = 0;
  }, []);

  return (
    <span
      ref={eleRef}
      className="danmaku"
      style={style}
      onMouseEnter={handleFocus}
      onMouseOut={handleUnFocus}
    >
      {words}
    </span>
  );
}

type AllFun = {
  launch: (props: Props) => any;
  // OrignDanmuku: React.FC<Props>;
};

type DanmukuType = React.MemoExoticComponent<
  (props: any) => React.ReactPortal
> &
  AllFun;

let root: any;
const Danmuku = portal(Component) as DanmukuType;
export const OrignDanmuku = memo(Component);
Danmuku.launch = (props: Props) => {
  const TempDanmuku = forwardRef<any>((_, ref) => {
    // useEffect(() => {
    //   timer = window.setTimeout(() => {
    //     setVisible(false)
    //   }, props.duration)
    //   return () => {
    //     window.clearTimeout(timer)
    //   }
    // }, [])

    // useImperativeHandle(ref, () => ({
    //   close: () => setVisible(false),
    // }))

    return <Danmuku {...props} />;
  });

  root = root || ReactDOM.createRoot(document.getElementById('screen') as HTMLElement);
  root.render(<TempDanmuku />);
  // ReactDOM2.render(
  //   <TempDanmuku />,
  //   document.getElementById("screen") as HTMLElement
  // );

  // return {
  //   close: () => {
  //     root.unmount();
  //   },
  // };
};
export default Danmuku;
