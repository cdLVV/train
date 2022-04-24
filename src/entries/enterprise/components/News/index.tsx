/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo } from "react";
import LazyImage from "../LazyImage";
import "./index.less";

interface Props {
  data: {
    img: string;
    title: string;
    date: string;
    desc: string;
  }[];
}

function Members(props: Props) {
  const { data } = props;

  return (
    <section className="section mx-4 sm:mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w">
      <h2 className="section-title">最新动态</h2>
      <div></div>
      <div className="flex flex-wrap">
        {data.map((item) => (
          <a key={item.img} className="px-[15px] cursor-pointer news-item">
            <div>
              <div className="news-item-img">
                <LazyImage src={item.img} alt={item.img} />
              </div>
              <div className="news-item-info">
                <div className="news-item-info-title">{item.title}</div>
                <div className="news-item-info-date">{item.date}</div>
                <div className="news-item-info-desc">{item.desc}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default memo(Members);
