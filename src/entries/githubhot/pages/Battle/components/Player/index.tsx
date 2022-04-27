import { getGithubUser, GetGithubUserRes } from "@/api/github";
import LazyImage from "@/entries/githubhot/components/LazyImage";
import { memo, useCallback, useState, ChangeEventHandler, useRef } from "react";
import { useFormik } from "formik";
import "./index.less";

interface Props {
  title: string;
  nameKey: string;
  onSubmit?: (player: any) => any;
  onCheck?: (player: string) => boolean;
}

function Player(props: Props) {
  const { title, onSubmit, onCheck, nameKey } = props;
  // const [name, setName] = useState("");
  // const nameRef = useRef(name);
  const [player, setPlayer] = useState<GetGithubUserRes | null>();
  const [loading, setLoading] = useState(false);
  // const handleNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
  //   (e) => {
  //     const val = e.target.value;
  //     setName(val);
  //     nameRef.current = val;
  //   },
  //   []
  // );
  const handleSubmit = useCallback(
    async (values: any) => {
      const { name } = values;
      console.log({ values });

      if (onCheck && !onCheck(name)) {
        // setName("");
        // formik.setValues({ name: "" });
        return;
      }
      setLoading(true);
      try {
        const res = await getGithubUser(name);
        setPlayer(res);
        onSubmit && onSubmit({ [nameKey]: res.login });
      } catch (error) {}
      setLoading(false);
    },
    [onCheck, onSubmit, nameKey]
  );

  const formik = useFormik({
    initialValues: { name: "" },
    onSubmit: (values) => handleSubmit(values),
  });

  const handleDel = useCallback(() => {
    setPlayer(null);
    onSubmit && onSubmit({ [nameKey]: "" });
  }, [nameKey, onSubmit]);

  console.log("formik", formik.values);

  return (
    <div className="player">
      <div className="title">{title}</div>
      {!player && !loading && (
        <form onSubmit={formik.handleSubmit}>
          <div className="input-wrap">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              placeholder="github username"
              onChange={formik.handleChange}
            />
            <button disabled={!formik.values.name} type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      {player && (
        <div className="user">
          <LazyImage src={player.avatar_url} />
          <div>{player.login}</div>
          <i className="fa fa-times fa-3x" onClick={handleDel} />
        </div>
      )}
      {!player && loading && (
        <div className="user">
          <i className="fa fa-spinner fa-x fa-spin fa-fw" />
        </div>
      )}
    </div>
  );
}

export default memo(Player);
