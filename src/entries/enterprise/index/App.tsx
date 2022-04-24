import { memo, useMemo } from "react";
import "./App.less";
import Header from "../components/Header";
import Hots from "../components/Hots";
import Members from "../components/Members";
import Swiper from "../components/Swiper";
import News from "../components/News";
import Footer from "../components/Footer";

import hot1 from "../images/hot/1.jpg";
import hot2 from "../images/hot/2.jpg";
import hot3 from "../images/hot/3.jpg";
import hot4 from "../images/hot/4.jpg";

import character1 from "../images/character/1.png";
import character2 from "../images/character/2.png";
import character3 from "../images/character/3.png";
import character4 from "../images/character/4.png";
import character5 from "../images/character/5.png";
import character6 from "../images/character/6.png";
import character7 from "../images/character/7.png";
import character8 from "../images/character/8.png";

import news1 from "../images/news/1.webp";
import news2 from "../images/news/2.webp";
import news3 from "../images/news/3.webp";
import news4 from "../images/news/4.webp";

function App() {
  const imgList = useMemo(
    () => [
      "https://wallpapers.com/images/high/jojo-bizarre-adventure-hero-banners-97au0jin9lw0i6lz.jpg",
      "https://gamingtrend.com/wp-content/uploads/2018/08/jojosbizarreadventure-anime-keyart-s1tos3.jpg",
      "https://www.yifengame.com/wp-content/uploads/2021/08/20210807031646-610dfb1e6c394.jpg",
    ],
    []
  );
  const hots = useMemo(
    () => [
      {
        name: "剧集映画",
        img: hot1,
      },
      {
        name: "剧集映画",
        img: hot2,
      },
      {
        name: "剧集映画",
        img: hot3,
      },
      {
        name: "剧集映画",
        img: hot4,
      },
    ],
    []
  );
  const members = useMemo(
    () => [
      {
        name: "空条徐伦",
        cv: "CV.伊濑茉莉也",
        img: character1,
      },
      {
        name: "艾梅斯·克斯提洛",
        cv: "CV.田村睦心",
        img: character2,
      },
      {
        name: "斗魂骇客",
        cv: "CV.伊濑茉莉也",
        img: character3,
      },
      {
        name: "安波里欧·亚曼纽",
        cv: "CV.种崎敦美",
        img: character4,
      },
      {
        name: "天气预报",
        cv: "CV.梅原裕一郎",
        img: character5,
      },
      {
        name: "纳鲁西索·安娜苏",
        cv: "CV.浪川大辅",
        img: character6,
      },
      {
        name: "空条承太郎",
        cv: "CV.小野大辅",
        img: character7,
      },
      {
        name: "恩里克·普奇",
        cv: "CV.关智一",
        img: character8,
      },
    ],
    []
  );

  const news = useMemo(
    () => [
      {
        title: "第1話推送",
        date: "2021.12.09",
        desc: "仅用3天时间，JOJO石之海就在播放量上超越了鬼灭之刃第二季，达到了3700万，按照这个速度破亿只是时间问题。而本季日漫播放量最高的国王排名，开播两个多月了也才刚刚过亿，最近还因为剧情问题导致评分开始下降！",
        img: news1,
      },
      {
        title: "第2話推送",
        date: "2021.12.09",
        desc: "仅用3天时间，JOJO石之海就在播放量上超越了鬼灭之刃第二季，达到了3700万，按照这个速度破亿只是时间问题。而本季日漫播放量最高的国王排名，开播两个多月了也才刚刚过亿，最近还因为剧情问题导致评分开始下降！",
        img: news2,
      },
      {
        title: "第3話推送",
        date: "2021.12.09",
        desc: "仅用3天时间，JOJO石之海就在播放量上超越了鬼灭之刃第二季，达到了3700万，按照这个速度破亿只是时间问题。而本季日漫播放量最高的国王排名，开播两个多月了也才刚刚过亿，最近还因为剧情问题导致评分开始下降！",
        img: news3,
      },
      {
        title: "第4話推送",
        date: "2021.12.09",
        desc: "仅用3天时间，JOJO石之海就在播放量上超越了鬼灭之刃第二季，达到了3700万，按照这个速度破亿只是时间问题。而本季日漫播放量最高的国王排名，开播两个多月了也才刚刚过亿，最近还因为剧情问题导致评分开始下降！",
        img: news4,
      },
    ],
    []
  );

  return (
    <div className="enterprise">
      <Header />
      <Swiper defaultIndex={0} imgList={imgList} autoPlay />
      <Hots hots={hots} />
      <Members data={members} />
      <News data={news} />
      <Footer />
    </div>
  );
}

export default memo(App);
