import { useCallback, useRef, useState } from "react";
import "./App.less";
import { OrignDanmuku } from "./components/Danmuku";

function App() {
  const words = useRef("");
  const count = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [danmakus, setDanmakus] = useState<any[]>([]);

  const handleSend = useCallback(() => {
    if (words.current) {
      /**
       * ! Alerts v18版本，通过render，每次只会显示一个dom
       */
      // Danmuku.launch({
      //   words: words.current,
      //   duration: 10,
      //   container: containerRef.current as HTMLDivElement,
      // });
      setDanmakus((pre) => [
        ...pre,
        {
          id: count.current++,
          words: words.current,
        },
      ]);
    }
  }, []);
  const handClear = useCallback(() => {
    setDanmakus([]);
  }, []);

  const handleChange = useCallback((e: any) => {
    words.current = e.target.value;
  }, []);
  const handleEnd = useCallback((item: any) => {
    setDanmakus((pre) => pre.filter((i) => item.id !== i.id));
  }, []);

  return (
    <div className="danmaku-wall">
      <div ref={containerRef} id="screen" className="screen">
        {danmakus.map((item) => (
          <OrignDanmuku
            key={item.id}
            words={item.words}
            container={containerRef.current}
            onEnd={() => handleEnd(item)}
          />
        ))}
      </div>
      <div className="text-center control-panel">
        <input
          type="text"
          placeholder="请输入弹幕内容"
          maxLength={50}
          onChange={handleChange}
        />
        <div>
          <button className="primary" type="button" onClick={handleSend}>
            发射
          </button>
          <button className="clean" type="button" onClick={handClear}>
            清屏
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
