import { memo, useMemo } from "react";
import "./App.less";
import Header from "./components/Header";
import Swiper from "./components/Swiper";

function App() {
  const imgList = useMemo(
    () => [
      "https://wallpapers.com/images/high/jojo-bizarre-adventure-hero-banners-97au0jin9lw0i6lz.jpg",
      "https://gamingtrend.com/wp-content/uploads/2018/08/jojosbizarreadventure-anime-keyart-s1tos3.jpg",
      "https://www.yifengame.com/wp-content/uploads/2021/08/20210807031646-610dfb1e6c394.jpg",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F0033ImPzly1h0ztka057uj61900u04kx02.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652593952&t=13063f26c46ffb54a41ec8ca0fe267d1",
    ],
    []
  );

  return (
    <div className="enterprise">
      <Header />
      <Swiper defaultIndex={0} imgList={imgList} autoPlay />
    </div>
  );
}

export default memo(App);
