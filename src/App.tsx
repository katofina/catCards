import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <UserProvider>
      <header>
        <Header />
      </header>
      <main>
        <Outlet/>
      </main>
    </UserProvider>
  );
}

export default App;
