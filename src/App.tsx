import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router";
import { UserProvider } from "./Context/UserContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </UserProvider>
    </I18nextProvider>
  );
}

export default App;
