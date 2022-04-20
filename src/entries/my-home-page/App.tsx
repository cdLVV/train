import React, { useEffect, useState } from "react";
import Card, { CardData } from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.less";

function App() {
  const [movies, setMovies] = useState<CardData[]>([]);
  const [books, setBooks] = useState<CardData[]>([]);

  useEffect(() => {
    setMovies([
      {
        url: "https://movie.douban.com/subject/3878007/",
        img: "https://image11.m1905.cn/mdb/uploadfile/2018/1130/thumb_1_283_390_20181130012210256352.jpg",
        name: "海王",
      },
      {
        url: "https://movie.douban.com/subject/3148748/",
        img: "https://img2.baidu.com/it/u=1704008115,4136983029&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=698",
        name: "海扁王",
      },
      {
        url: "https://movie.douban.com/subject/24745500/",
        img: "https://image11.m1905.cn/uploadfile/2014/0724/thumb_1_283_390_20140724114103329537.jpg",
        name: "绣春刀",
      },
      {
        url: "https://movie.douban.com/subject/10440138/",
        img: "https://image11.m1905.cn/mdb/uploadfile/2018/0424/thumb_1_120_168_20180424113100761911.jpg",
        name: "侏罗纪世纪",
      },
    ]);
    setBooks([
      {
        url: "https://weread.qq.com/web/reader/bb0323c059f35bbb09128b6",
        img: "https://easyreadfs.nosdn.127.net/uYftoBXH013noScxQQOC-g==/8796093024903999542",
        name: "黄金时代",
      },
      {
        url: "https://weread.qq.com/web/reader/cbc32b80718f97d4cbcb593",
        img: "https://ae01.alicdn.com/kf/U5fe7256090c1450d9ad7f7cdfb3a23ea1.jpg",
        name: "月亮与六便士",
      },
      {
        url: "https://weread.qq.com/web/reader/0a9321e0721071e60a99821",
        img: "https://www.gpdf.net/wp-content/uploads/2021/02/s29459941.jpg",
        name: "断头王后",
      },
      {
        url: "https://weread.qq.com/web/reader/d1e32b30811e339c8g018e56",
        img: "https://wfqqreader-1252317822.image.myqcloud.com/cover/123/24284123/t6_24284123.jpg",
        name: "经济学原理",
      },
    ]);
  }, []);
  return (
    <div className="my-home-page">
      <Header />
      <main className="w-content">
        <section id="movie">
          <h2 className="section-title font-bold text-center text-lg">
            喜欢的电影
          </h2>
          <div className="section-wrapper">
            {movies.map((item) => (
              <Card key={item.name} className="section-item" {...item} />
            ))}
          </div>
        </section>
        <section id="book">
          <h2 className="section-title font-bold text-center text-lg">
            喜欢的书
          </h2>
          <div className="section-wrapper">
            {books.map((item) => (
              <Card key={item.name} className="section-item" {...item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
