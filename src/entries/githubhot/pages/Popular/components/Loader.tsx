import { memo } from "react";

interface Props {
  isError?: boolean;
  isLoading: boolean;
  reload?: any;
}
const Loader = (props: Props) => {
  const { isLoading, isError, reload } = props;

  if (isLoading) {
    return <i className="fa fa-spinner fa-spin fa-2x fa-fw" />;
  }
  if (isError) {
    return <div onClick={reload}>重新加载</div>;
  }
  return null;
};

export default memo(Loader);
