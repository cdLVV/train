import { memo, useCallback, useEffect, useState } from "react";
import "./App.less";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getNewsList, GetNewsListRes } from "@/api/enterprise";
import NewsList from "../components/NewsList";
import Pagination from "../components/Pagination";

const setHash = (str: string) => {
  window.location.hash = str;
};

function App() {
  const params = new URLSearchParams(window.location.hash.replace("#", ""));
  const paramsPage = Number(params.get("page")) || 1;
  const paramsLimit = Number(params.get("limit")) || 10;
  const [page, setPage] = useState(paramsPage);
  const [limit, setLimit] = useState(paramsLimit);
  const [newsList, setNewsList] = useState<GetNewsListRes["data"]>();
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    // hash路由变化时，根据路由渲染对应 UI
    function handleHashChange() {
      const params = new URLSearchParams(window.location.hash.replace("#", ""));
      const page = Number(params.get("page")) || 1;
      const limit = Number(params.get("limit")) || 10;
      setPage(page);
      setLimit(limit);
    }

    // handleHashChange(); // 页面加载时不一定触发hashchange事件,这里手动触发一次

    // 监听路由变化
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    getNewsList()
      .setParams({
        page,
        page_size: limit,
      })
      .then((res) => {
        setNewsList(res.data);
        setTotalPage(Math.ceil(res.meta.total / res.meta.per_page));
      });
  }, [limit, page]);

  const changeHash = useCallback((page: any, limit: any) => {
    setHash(`#?page=${page}&limit=${limit}`);
  }, []);

  return (
    <div className="enterprise">
      <Header />
      <NewsList data={newsList} />
      <Pagination
        totalPage={totalPage}
        current={page}
        limit={limit}
        onPageChange={changeHash}
      />
      <Footer />
    </div>
  );
}

export default memo(App);
