import Header from "./components/Header";
import styles from "./App.module.less";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <section className="flex-1"></section>
    </div>
  );
}
