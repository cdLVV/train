import React, { memo } from "react";
import "./index.less";

function Header(props: any) {
  return (
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
  );
}

export default memo(Header);
