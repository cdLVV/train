import { memo } from "react";
import LazyImage from "../LazyImage";
import "./index.less";

interface Props {
  data: {
    img: string;
    name: string;
    cv: string;
  }[];
}

function Members(props: Props) {
  const { data } = props;

  return (
    <section className="section mx-4 sm:mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w">
      <h2 className="section-title">团队介绍</h2>
      <div></div>
      <div className="flex flex-wrap">
        {data.map((item) => (
          <div
            key={item.img}
            className="h-[400px] px-[15px] pt-[30px] cursor-pointer member-item"
          >
            <div className="member-item-bg">
              <div />
            </div>
            <div className="member-item-img">
              <LazyImage src={item.img} alt={item.name} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 mx-auto flex items-start flex-col z-10 member-item-info">
              <div>{item.name}</div>
              <div>{item.cv}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Members);
