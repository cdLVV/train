"use strict";

const memo = React.memo;

function FooterO() {
  return (
    <footer className="flex justify-center py-4 bg-gray-400 text-white">
      版权所有 © XXXXX
    </footer>
  );
}

function Nav() {
  return (
    <nav className="bg-white flex items-center px-10 h-20 z-10 text-lg">
      <a
        aria-current="page"
        className="mr-8 text-blue-600 hover:text-blue-500"
        href="#/"
      >
        Popular
      </a>
      <a className="hover:text-blue-500" href="#/battle">
        Battle
      </a>
    </nav>
  );
}

const Footer = React.memo(FooterO);
const Popular = window.github.components.Popular;

function App() {
  return (
    <div className="app flex flex-col">
      <Nav />
      <section className="flex-1"><Popular /></section>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
