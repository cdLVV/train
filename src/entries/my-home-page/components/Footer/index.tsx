import React, { memo } from "react";
import "./index.less";

function Footer(props: any) {
  return (
    <footer id="talking" className="footer">
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
        <p className="copyright py-2 text-sm text-center">版权所有@极客大叔</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
