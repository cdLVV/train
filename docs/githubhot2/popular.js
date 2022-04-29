// import InfiniteScroll from "react-infinite-scroll-component";

// import styles from "./index.module.less";

const getSearchRepositories = window.github.apis.getSearchRepositories;

const memo = React.memo;
const useCallback = React.useCallback;
const useEffect = React.useEffect;
const useRef = React.useRef;
const useState = React.useState;

const languages = ["All", "JavaScript", "Ruby", "Java", "Css"];

let Loader = (props) => {
  const { isLoading, isError, reload } = props;

  if (isLoading) {
    return <i className="fa fa-spinner fa-spin fa-2x fa-fw" />;
  }
  if (isError) {
    return <div onClick={reload}>重新加载</div>;
  }
  return null;
};

Loader = memo(Loader);

function LazyImage(props) {
  const {
    src,
    srcSet,
    className,
    lazy = true,
    defaultSrc = "loading.gif",
    ...rest
  } = props;

  return (
    <img
      src={defaultSrc}
      data-src={src}
      data-srcset={srcSet}
      {...rest}
      className={classNames(className, { lazyload: lazy })}
    />
  );
}

LazyImage = memo(LazyImage);

const InfiniteScroll = window.InfiniteScroll;

function Page() {
  const [language, setLanguage] = useState("all");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(isLoading);
  const languageRef = useRef(language);
  const pageRef = useRef(1);
  const [list, setList] = useState([]);
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
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
    // setIsLoading(false);
    isLoadingRef.current = false;
  }, []);

  const handleClick = useCallback((e) => {
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
  }, [language]);

  return (
    <>
      <div className="nav text-lg" onClick={handleClick}>
        {languages.map((item) => (
          <div
            key={item}
            data-val={item}
            className={
              language.toUpperCase() === item.toUpperCase() ? "active" : ""
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
          <div className="end absolute bottom-0 left-0 right-0 flex justify-center py-5">
            <Loader isError={isError} isLoading={isLoading} reload={loadMore} />
          </div>
        }
        className="list flex flex-wrap justify-around px-8 relative pb-9"
        endMessage={<div className="end">已经到最后了！</div>}
      >
        {list?.map((item, index) => (
          <div
            key={item.id}
            className="itemWrap flex-none w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <div className="item flex flex-col items-center mx-auto w-full sm:w-11/12 lg:w-10/12">
              <h2 className="index font-bold text-2xl my-4">#{index + 1}</h2>
              <LazyImage className="w-1/2" src={item.owner.avatar_url} />
              <a className="fullName my-4 break-all" href={item.html_url}>
                {item.full_name}
              </a>
              <div className="desc w-full relative">
                <i
                  className="fa fa-user-circle text-lg inline-flex w-4 items-center absolute top-0"
                  style={{ color: "rgb(255, 191, 116)" }}
                />
                <a className="pl-6 break-all" href={item.owner.html_url}>
                  {item.name}
                </a>
              </div>
              <div className="desc w-full relative">
                <i
                  className="fa fa-star text-lg inline-flex w-4 items-center absolute top-0"
                  style={{ color: "rgb(255, 215, 0)" }}
                />
                <span className="pl-6 break-all">{item.stargazers_count}</span>
              </div>
              <div className="desc w-full relative">
                <i
                  className="fa fa-code-fork text-lg inline-flex w-4 items-center absolute top-0"
                  style={{ color: "rgb(129, 195, 245)" }}
                />
                <span className="pl-6 break-all">{item.forks}</span>
              </div>
              <div className="desc w-full relative">
                <i
                  className="fa fa-warning text-lg inline-flex w-4 items-center absolute top-0"
                  style={{ color: "rgb(241, 138, 147)" }}
                />
                <span className="pl-6 break-all">{item.open_issues}</span>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
var Popular = memo(Page);

window.github.injectComponents({ Popular });
