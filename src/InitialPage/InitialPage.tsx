import React from "react";
import "./InitialPage.scss";

export default function InitialPage() {
  return (
    <div className="IP-main">
      <h1 className="IP-text">Kittens that melt your heart</h1>
      <a href="/catcards" className="IP-button">
        Go ahead
      </a>
    </div>
  );
}
