/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo } from "react";
import bgImg from "../../images/bg_pattern_02.png";

function Header(props: any) {
  return (
    <div
      className="bg-repeat bg-left-top py-3 text-white"
      style={{
        backgroundSize: "246px 280px",
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between py-5 border-b border-opacity-10 border-white">
          <div className="flex mb-4 flex-none w-full sm:w-5/6 lg:w-2/3 pt-5">
            <div className="flex flex-col items-center justify-start flex-1">
              <img
                width="36px"
                height="36px"
                alt=""
                src={require("../../images/footer/address.png")}
              />
              <span className="text-center">福州市仓山区万达广场B区</span>
            </div>
            <div className="flex flex-col items-center justify-start flex-1">
              <img
                width="36px"
                height="36px"
                alt=""
                src={require("../../images/footer/email.png")}
              />
              <span className="text-center">admin@example.com</span>
            </div>
            <div className="flex flex-col items-center justify-start flex-1">
              <img
                width="36px"
                height="36px"
                alt=""
                src={require("../../images/footer/contact-us.png")}
              />
              <span className="text-center">400-123-4567</span>
            </div>
          </div>
          <div className="flex flex-shrink-0  w-full sm:w-1/6 lg:w-1/3">
            <img
              className="mx-auto"
              width="120px"
              height="120px"
              src={require("../../images/footer/qrcode.jpg")}
              alt="二维码"
            />
          </div>
        </div>
        <p className="text-center pt-3 text-xs">
          ©LUCKY LAND COMMUNICATIONS/SHUEISHA,JOJO's Animation SO Project
        </p>
      </div>
    </div>
  );
}

export default memo(Header);
