import { memo, useEffect, useMemo, useRef, useState } from "react";
import "./App.less";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getNewsDetailByCode, GetNewsDetailByCodeRes } from "@/api/enterprise";
import errorImg from "../images/error.jpeg";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

function App() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code") || "";
  const [data, setData] = useState<GetNewsDetailByCodeRes["data"]>();
  const isLazyImg = useRef(false);
  const text = data?.text || "";

  const html = useMemo(() => {
    const regex3 = new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi);

    return isLazyImg.current
      ? text.replace(regex3, function (match, capture) {
          // console.log({ match, capture });
          if (!match.includes("class=")) {
            match = match.replace("<img ", '<img class="img"');
          }

          return match
            .replace("src=", "data-src=")
            .replace('class="', 'class="lazyload ')
            .replace("class='", "class='lazyload ");
        })
      : text;
  }, [text]);

  useEffect(() => {
    getNewsDetailByCode(code)
      .then((res) => {
        isLazyImg.current = true;
        setData(res.data);
      })
      .catch((e) => {
        setData({
          code,
          title: "暂未找到当前新闻",
          text: `<img src="${errorImg}" class="error-img" />`,
        });
      });
  }, [code]);

  return (
    <div className="news-detail flex flex-col">
      <Header />
      <div className="news-detail-title flex-none">
        <div>{data?.title}</div>
      </div>
      <div
        className="news-detail-content py-4 flex-shrink-0 flex-grow relative mx-4 sm:mx-auto sm:max-w-[580px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1200px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Footer className="flex-none" />
    </div>
  );
}

export default memo(App);
