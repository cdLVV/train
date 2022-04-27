import { notification } from "antd";
import { useNavigate, createSearchParams } from "react-router-dom";
import { memo, useCallback, useMemo, useState } from "react";
import Player from "./components/Player";
import styles from "./index.module.less";

function Page() {
  const [names, setNames] = useState({
    name1: "",
    name2: "",
  });
  const navigate = useNavigate();
  const canBattle = useMemo(
    () => Object.values(names).every((item) => !!item),
    [names]
  );
  const handleCheck = useCallback(
    (name: string) => {
      const canSubmit = !Object.values(names).some((item) => item === name);
      if (!canSubmit) {
        notification.error({
          top: 80,
          message: "出错了",
          description: `原因：当前player已经存在了`,
        });
      }
      return canSubmit;
    },
    [names]
  );
  const handleSetPlayer = useCallback((player: any) => {
    setNames((pre) => ({ ...pre, ...player }));
  }, []);
  const handleBattle = useCallback(() => {
    navigate({
      pathname: "/battle-result",
      search: `?${createSearchParams(names)}`,
    });
  }, [names, navigate]);
  return (
    <div className={styles.index}>
      <h2 className={styles.title}>Instructions</h2>
      <div className={styles.desc}>
        <div className={styles.descItem}>
          <div>Enter two Github:</div>
          <i className="fa fa-users" style={{ color: "rgb(255, 191, 116)" }} />
        </div>
        <div className={styles.descItem}>
          <div>Battle</div>
          <i className="fa fa-fighter-jet" style={{ color: "gray" }} />
        </div>
        <div className={styles.descItem}>
          <div>See the winner</div>
          <i
            className="fa fa-angellist"
            style={{ color: "rgb(244, 234, 42)" }}
          />
        </div>
      </div>
      <h2 className={styles.title}>Players</h2>
      <div className={styles.players}>
        <Player
          nameKey="name1"
          title="Player One"
          onCheck={handleCheck}
          onSubmit={handleSetPlayer}
        />
        <Player
          nameKey="name2"
          title="Player Two"
          onCheck={handleCheck}
          onSubmit={handleSetPlayer}
        />
      </div>
      {canBattle && (
        <div className={styles.btnWrap}>
          <button onClick={handleBattle}>Battle</button>
        </div>
      )}
    </div>
  );
}
export default memo(Page);
