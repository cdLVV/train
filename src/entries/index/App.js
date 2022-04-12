import "./App.css";

function App() {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return (
    <div className="App">
      <h1>Train</h1>
      <a href={PUBLIC_URL + "/a.html"}>Goto A Page</a>
      <a href={PUBLIC_URL + "/b.html"}>Goto B Page</a>
      <a target="_blank" href={PUBLIC_URL + "/my-home-page.html"}>
        个人展示页
      </a>
      <a target="_blank" href={PUBLIC_URL + "/danmaku-wall.html"}>
        弹幕墙
      </a>
      <a target="_blank" href={PUBLIC_URL + "/enterprise/index.html"}>
        企业站
      </a>
    </div>
  );
}

export default App;
