import React from "react";
import "./Header.css";
import HeaderButtons from "./buttons/HeaderButtons";

export default function Header() {
  return (
    <div className="Header">
      <div className="Header-title">
        <a className="Header-title-ref" href="/">
          <h1>CatCards</h1>
        </a>
      </div>

      <HeaderButtons/>
    </div>
  );
}
