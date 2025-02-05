import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="Header">
      <div className="Header-title">
        <a className="Header-title-ref" href="/"><h1>CatCards</h1></a>
      </div>

      <div className="Header-button-container">
        <a className="Header-buttons" href="/">
          Sign In
        </a>
        <a className="Header-buttons" href="/">
          Sign Up
        </a>
      </div>
    </div>
  );
}
