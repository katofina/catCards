import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
