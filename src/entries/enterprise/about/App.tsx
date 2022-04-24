import { memo, useEffect } from "react";
import "./App.less";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  useEffect(() => {
    // @ts-ignore
    window.initMap();
  }, []);

  return (
    <div className="enterprise">
      <Header />
      <section className="flex flex-col sm:flex-row py-4 px-3">
        <div
          // style="width: 697px; height: 550px; border: #ccc solid 1px"
          className=" h-[550px] border border-gray-300 flex-none w-full sm:w-1/2"
          id="dituContent"
        />
        <div className="w-full sm:w-1/2 py-4 sm:py-0 sm:pl-3">
          公元2011年，美国佛罗里达州。
          空条徐伦在与恋人开车兜风时遭遇交通事故，之后因被人陷害而获刑长达15年之久。
          她被关押在州立绿海豚街重警备监狱 ——别名“水族馆”。
          被逼到绝望边缘的徐伦，却通过父亲托付给她的吊坠而觉醒了体内不可思议的力量。
          “这个世界上存在着比死亡更可怕的事情
          而且这件事情将必定在这家监狱发生。”
          这是出现在徐伦面前的神秘少年所留下的讯息。 难以理解的事件接连发生。
          前来探监的父亲空条承太郎口中讲述的恐怖事实，以及一个叫做“DIO”的名字…。
          究竟空条徐伦能否从这所监狱 ——“石之海”中获得自由？
          然后，为跨越百年以上的乔斯达家与DIO的因缘打下终止符的最后战斗即将开始!!
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default memo(App);
