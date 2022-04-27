import { getSearchRepositories, GetSearchRepositoriesRes } from "@/api/github";
import InfiniteScroll from "react-infinite-scroll-component";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import Loader from "./components/Loader";
import LazyImage from "../../components/LazyImage";

import styles from "./index.module.less";

const languages = ["All", "JavaScript", "Ruby", "Java", "Css"];
function Page() {
  const [language, setLanguage] = useState("all");

  // const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(isLoading);
  const languageRef = useRef(language);
  const pageRef = useRef(1);
  const [list, setList] = useState<GetSearchRepositoriesRes["items"]>([]);
  const [hasMore, setHasMore] = useState(true);
  const hasMoreRef = useRef(hasMore);

  const loadMore = useCallback(async () => {
    const language = languageRef.current;
    const page = pageRef.current;

    if (isLoadingRef.current || !hasMoreRef.current) {
      return;
    }
    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const res = await getSearchRepositories().setParams({
        q: `stars:>1${language !== "all" ? `+language:${language}` : ""}`,
        sort: "stars",
        order: "desc",
        type: "Repositories",
        page,
      });

      setList((pre) => {
        return [...pre, ...res.items];
      });
      hasMoreRef.current = page <= 4;
      pageRef.current += 1;
      setHasMore(hasMoreRef.current);
      // setPage(pageRef.current);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
    isLoadingRef.current = false;
  }, []);

  const handleClick = useCallback((e: any) => {
    const val = String(e.target.dataset.val || "").toLowerCase();
    if (languageRef.current !== val && val) {
      setLanguage((pre) => val || pre);
      setList([]);
    }
  }, []);

  useEffect(() => {
    // 语言切换
    if (languageRef.current !== language) {
      pageRef.current = 1;
      hasMoreRef.current = true;
      languageRef.current = language;
    }
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <>
      <div className={styles.nav} onClick={handleClick}>
        {languages.map((item) => (
          <div
            key={item}
            data-val={item}
            className={
              language.toUpperCase() === item.toUpperCase() ? styles.active : ""
            }
          >
            {item}
          </div>
        ))}
      </div>
      <InfiniteScroll
        dataLength={list?.length || 0}
        hasMore={hasMore}
        next={loadMore}
        loader={
          <div className={styles.end}>
            <Loader isError={isError} isLoading={isLoading} reload={loadMore} />
          </div>
        }
        className={styles.list}
        endMessage={<div className={styles.end}>已经到最后了！</div>}
      >
        {list?.map((item, index) => (
          <div key={item.id} className={styles.itemWrap}>
            <div className={styles.item}>
              <h2 className={styles.index}>#{index + 1}</h2>
              <LazyImage className="w-1/2" src={item.owner.avatar_url} />
              <a className={styles.fullName} href={item.html_url}>
                {item.full_name}
              </a>
              <div className={styles.desc}>
                <i
                  className="fa fa-user-circle"
                  style={{ color: "rgb(255, 191, 116)" }}
                />
                <a href={item.owner.html_url}>{item.name}</a>
              </div>
              <div className={styles.desc}>
                <i
                  className="fa fa-star"
                  style={{ color: "rgb(255, 215, 0)" }}
                />
                <span>{item.stargazers_count}</span>
              </div>
              <div className={styles.desc}>
                <i
                  className="fa fa-code-fork"
                  style={{ color: "rgb(129, 195, 245)" }}
                />
                <span>{item.forks}</span>
              </div>
              <div className={styles.desc}>
                <i
                  className="fa fa-warning"
                  style={{ color: "rgb(241, 138, 147)" }}
                />
                <span>{item.open_issues}</span>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
export default memo(Page);
