import "./App.css";

function App() {
  return (
    <div className="my-home-page">
      <div className="header">
        <div className="header-wrapper w-content flex flex-row justify-between items-center">
          <div className="header-left flex flex-row items-center">
            <div className="avator">
              <img
                width="42"
                height="42"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F03%2F30%2F35b980532ba9860fc07614eb3ba9c30f.jpg&amp;refer=http%3A%2F%2Fbpic.588ku.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1644997086&amp;t=857bbaf90e3fa08d949362e96669288f"
                alt="头像"
              />
            </div>
            <span>极客大叔的爱好</span>
          </div>
          <div className="header-right">
            <a href="#movie">喜欢的电影</a>
            <a href="#book">喜欢的书</a>
            <a href="#talking">聊一聊</a>
          </div>
        </div>
      </div>
      <main className="w-content">
        <section id="movie">
          <h2 className="section-title font-bold text-center text-lg">
            喜欢的电影
          </h2>
          <div className="section-wrapper">
            <a
              href="https://movie.douban.com/subject/3878007/"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://image11.m1905.cn/mdb/uploadfile/2018/1130/thumb_1_283_390_20181130012210256352.jpg"
                alt="海王"
              />
              <span>海王</span>
            </a>
            <a
              href="https://movie.douban.com/subject/3148748/"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://img2.baidu.com/it/u=1704008115,4136983029&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=698"
                alt="海扁王"
              />
              <span>海扁王</span>
            </a>
            <a
              href="https://movie.douban.com/subject/24745500/"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://image11.m1905.cn/uploadfile/2014/0724/thumb_1_283_390_20140724114103329537.jpg"
                alt="绣春刀"
              />
              <span>绣春刀</span>
            </a>
            <a
              href="https://movie.douban.com/subject/10440138/"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://image11.m1905.cn/mdb/uploadfile/2018/0424/thumb_1_120_168_20180424113100761911.jpg"
                alt="侏罗纪世纪"
              />
              <span>侏罗纪世纪</span>
            </a>
          </div>
        </section>
        <section id="book">
          <h2 className="section-title font-bold text-center text-lg">
            喜欢的书
          </h2>
          <div className="section-wrapper">
            <a
              href="https://weread.qq.com/web/reader/bb0323c059f35bbb09128b6"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://easyreadfs.nosdn.127.net/uYftoBXH013noScxQQOC-g==/8796093024903999542"
                alt="黄金时代"
              />
              <span>黄金时代</span>
            </a>
            <a
              href="https://weread.qq.com/web/reader/cbc32b80718f97d4cbcb593"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://ae01.alicdn.com/kf/U5fe7256090c1450d9ad7f7cdfb3a23ea1.jpg"
                alt="月亮与六便士"
              />
              <span>月亮与六便士</span>
            </a>
            <a
              href="https://weread.qq.com/web/reader/0a9321e0721071e60a99821"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://www.gpdf.net/wp-content/uploads/2021/02/s29459941.jpg"
                alt="断头王后"
              />
              <span>断头王后</span>
            </a>
            <a
              href="https://weread.qq.com/web/reader/d1e32b30811e339c8g018e56"
              target="_blank"
              className="text-center section-item"
            >
              <img
                src="https://wfqqreader-1252317822.image.myqcloud.com/cover/123/24284123/t6_24284123.jpg"
                alt="经济学原理"
              />
              <span>经济学原理</span>
            </a>
          </div>
        </section>
      </main>
      <footer id="talking">
        <div className="w-content footer-wrapper">
          <div className="py-3 flex items-center justify-between">
            <p>
              王小波说他是一只特立独行的猪，那我就当个一只特立独行的鸟吧。交个朋友么，扫下右边的二维码。
            </p>
            <img
              className="qr-code"
              width="120"
              height="120"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F07c6686e680086ee3c92eb48e10df3325832fac568d-uvzROb_fw658&amp;refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1644998928&amp;t=78974b201e95977b57d1faafdb6a821d"
              alt="二维码"
            />
          </div>
          <p className="copyright py-2 text-sm text-center">
            版权所有@极客大叔
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
