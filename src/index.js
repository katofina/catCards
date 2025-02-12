import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import InitialPage from "./InitialPage/InitialPage";
import CatCards from "./CatCards/CatCards";
import Profile from "./Profile/Profile";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<InitialPage />} />
          <Route path="/catcards/:id?" element={<CatCards />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
