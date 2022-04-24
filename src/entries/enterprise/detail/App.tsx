import { memo, useEffect, useMemo, useState } from "react";
import "./App.less";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getNewsDetailByCode, GetNewsDetailByCodeRes } from "@/api/enterprise";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

function App() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code") || "";
  const [data, setData] = useState<GetNewsDetailByCodeRes["data"]>();
  const text = data?.text || "";

  const html = useMemo(() => {
    const regex3 = new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi);

    return text.replace(regex3, function (match, capture) {
      console.log("capture:", capture);
      console.log("match:", match);
      if (!match.includes("class=")) {
        match = match.replace("<img ", '<img class="img"');
      }

      return match
        .replace("src=", "data-src=")
        .replace('class="', 'class="lazyload ')
        .replace("class='", "class='lazyload ");
    });
  }, [text]);

  useEffect(() => {
    getNewsDetailByCode(code).then((res) => {
      setData(res.data);
    });
  }, [code]);

  return (
    <div className="news-detail">
      <Header />
      <div className="news-detail-title">
        <div>{data?.title}</div>
      </div>
      <div className="px-5 py-4" dangerouslySetInnerHTML={{ __html: html }} />
      <Footer />
    </div>
  );
}

export default memo(App);
