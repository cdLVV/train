import { memo } from "react";
import "./index.less";

interface Props {
  hots: {
    img: string;
    name: string;
  }[];
}

function Hots(props: Props) {
  const { hots } = props;
  return (
    <section className="section mx-4 sm:mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w">
      <h2 className="section-title">热⻔产品</h2>
      <div className="ring ring-primary ring-offset-2 mx-2">
        <div className="flex  py-[15px] flex-wrap ring-1 ring-primary">
          {hots.map((item) => (
            <div
              key={item.img}
              className="mb-4 px-[15px] flex-none w-full sm:w-1/2 lg:w-1/4"
            >
              <img src={item.img} alt={item.name} />
              <div className="py-2">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Hots);
