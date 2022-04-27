import { Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Player from "./components/Player";
import styles from "./index.module.less";
import { getGithubUser, GetGithubUserRes } from "@/api/github";

const STATUS = {
  WIN: "Winner",
  LOSE: "Loser",
  TIE: "Tie",
};
function Page() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const name1 = search.get("name1") || "";
  const name2 = search.get("name2") || "";
  const [player1, setPlayer1] = useState<GetGithubUserRes | null>();
  const [player2, setPlayer2] = useState<GetGithubUserRes | null>();
  const [loading, setLoading] = useState(false);

  const handleRest = useCallback(() => {
    navigate("/battle", {
      replace: true,
    });
  }, [navigate]);

  useEffect(() => {
    if (!name1 || !name2) {
      Modal.confirm({
        title: "错误",
        content: "Player名称或数量不正确",
        onOk: handleRest,
        okText: "返回",
        cancelText: "取消",
      });
      return;
    }
    const getPlayer = async (name: string) => {
      setLoading(true);
      const res = await getGithubUser(name).setConfig({
        showError: false,
      });
      return res;
    };

    Promise.all([getPlayer(name1), getPlayer(name2)])
      .then(([res1, res2]) => {
        setPlayer1(res1);
        setPlayer2(res2);
      })
      .catch((e) => {
        Modal.confirm({
          title: "错误",
          content: "未找到Player，将返回Battle页面。",
          onOk: handleRest,
          okText: "返回",
          cancelText: "取消",
        });
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name1, name2]);

  const [p1State, p2State] = useMemo(() => {
    if (!player1 || !player2) {
      return ["", ""];
    }
    if (player1.public_repos === player2.public_repos) {
      return [STATUS.TIE, STATUS.TIE];
    } else if (player1.public_repos > player2.public_repos) {
      return [STATUS.WIN, STATUS.LOSE];
    }
    return [STATUS.LOSE, STATUS.WIN];
  }, [player1, player2]);

  return (
    <div className={styles.index}>
      {loading && <i className="fa fa-spinner fa-spin fa-2x fa-fw" />}
      {!!player1 && !!player2 && (
        <div className={styles.players}>
          <Player key={player1.login} data={player1} title={p1State} />
          <Player key={player2.login} data={player2} title={p2State} />
        </div>
      )}
      <div className={styles.btnWrap}>
        <button onClick={handleRest}>RESET</button>
      </div>
    </div>
  );
}
export default memo(Page);
