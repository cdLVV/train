import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Nav from "./components/Header";
import Footer from "./components/Footer";
import styles from "./App.module.less";
import Fallback from "./components/Fallback";

const Popular = lazy(
  () => import(/* webpackChunkName: 'Popular' */ "./pages/Popular")
);
const Battle = lazy(
  () => import(/* webpackChunkName: 'Battle' */ "./pages/Battle")
);
const BattleResult = lazy(
  () => import(/* webpackChunkName: 'BattleResult' */ "./pages/BattleResult")
);

export default function App() {
  const routes = [
    {
      path: "/",
      element: <Popular />,
    },
    {
      path: "/battle",
      element: <Battle />,
    },
    {
      path: "/battle-result",
      element: <BattleResult />,
    },
  ];

  const element = useRoutes(routes);

  return (
    <div className={styles.app}>
      <Nav />
      <section className="flex-1">
        <Suspense fallback={<Fallback />}>{element}</Suspense>
      </section>
      <Footer />
    </div>
  );
}
