import React from "react";
import "./Header.scss";
import HeaderButtons from "./buttons/HeaderButtons";
import SwitchLangButtons from "./buttons/SwitchLangButtons/SwitchLangButtons";

export default function Header() {
  return (
    <div className="Header">
      <div className="Header-title">
        <a className="Header-title-ref" href="/">
          <h1>CatCards</h1>
        </a>
      </div>
      <SwitchLangButtons/>

      <HeaderButtons />
    </div>
  );
}
