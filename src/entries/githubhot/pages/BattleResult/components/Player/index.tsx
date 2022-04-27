import { GetGithubUserRes } from "@/api/github";
import LazyImage from "@/entries/githubhot/components/LazyImage";
import { memo } from "react";
import styles from "./index.module.less";

interface Props {
  title: string;
  data: GetGithubUserRes;
}

function Player(props: Props) {
  const { title, data } = props;
  const { avatar_url, location, following, followers, public_repos, login } = data;
  return (
    <div className={styles.player}>
      <div className={styles.title}>{title}</div>
      <LazyImage src={avatar_url} />
      <div className={styles.score}>Scores: {public_repos}</div>
      <div className={styles.login}>{login}</div>
      <div className={styles.user}>
        <div title={location}>
          <i className="fa fa-location-arrow" style={{ color: "#ffbf74" }} />
          <span>{location}</span>
        </div>
        <div>
          <i className="fa fa-group" style={{ color: "#ffd701" }} />
          <span>{followers}</span>
        </div>
        <div>
          <i className="fa fa-user-plus" style={{ color: "#8dc6f3" }} />
          <span>{following}</span>
        </div>
        <div>
          <i className="fa fa-code" style={{ color: "#f18d95" }} />
          <span>{public_repos}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(Player);
