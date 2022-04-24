import { memo, useCallback, useMemo, useRef } from "react";
import cn from "classnames";
import "./index.less";

interface Iprops {
  current: number;
  limit: number;
  totalPage: number;
  onPageChange: (page?: number, limit?: number) => any;
}
function Pagination(props: Iprops) {
  const { totalPage, current, onPageChange, limit } = props;
  const totalPageRef = useRef(totalPage);
  totalPageRef.current = totalPage;
  const total = useMemo(() => new Array(totalPage).fill(0), [totalPage]);
  const handlePageChange = useCallback(
    (e: any) => {
      const page = Number(e.target.dataset.page);

      if (page >= 1 && page <= totalPageRef.current) {
        onPageChange(page, limit);
      }
    },
    [onPageChange, limit]
  );
  return (
    <nav aria-label="container">
      <ul
        className="pagination mx-auto flex justify-center items-center"
        onClick={handlePageChange}
      >
        <li
          className={cn("page-item-not-active", {
            "page-item-disabled": current === 1,
          })}
          data-page={current - 1}
        >
          «
        </li>
        {total.map((item, index) => (
          <li
            key={index + 1}
            data-page={index + 1}
            className={cn({
              "page-item-active": index + 1 === current,
              "page-item-not-active": index + 1 !== current,
            })}
          >
            {index + 1}
          </li>
        ))}
        <li
          className={cn("page-item-not-active", {
            "page-item-disabled": current === totalPage,
          })}
          data-page={current + 1}
        >
          »
        </li>
      </ul>
    </nav>
  );
}

export default memo(Pagination);
