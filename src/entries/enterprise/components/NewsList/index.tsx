import { NewsItem } from "@/api/enterprise";
import { memo } from "react";
import LazyImage from "../LazyImage";
import "./index.less";

interface Props {
  data?: NewsItem[];
}

function Members(props: Props) {
  const { data } = props;

  return (
    <section className="mt-4 section mx-4 sm:mx-auto sm:max-w-[580px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w">
      <div className="flex flex-wrap m-auto">
        {data?.map((item) => (
          <a
            key={item.code}
            href={`${window.location.origin}${process.env.PUBLIC_URL}/enterprise/detail.html?code=${item.code}`}
            className="news-item px-[15px] cursor-pointer mb-4 flex-none relative flex w-full sm:w-1/2 flex-col sm:flex-row"
          >
            <div className="news-item-img overflow-hidden flex-none w-full sm:w-[150px] lg:w-[200px] h-[200px] sm:h-full">
              <LazyImage src={item.img} alt={item.img} />
            </div>
            <div className="news-item-info border py-2 sm:py-0 px-3 sm:flex-grow">
              <div className="news-item-info-title font-bold text-lg my-3">
                {item.title}
              </div>
              <div className="news-item-info-keyword text-base">
                {item.keyword}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default memo(Members);
