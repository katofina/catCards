import "./App.css";
import React from "react";
import Header from "./Header/Header";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="App-main">
        <h1 className="App-text">Kittens that melt your heart</h1>
        <a href="/" className="App-button">
          Go ahead
        </a>
      </main>
    </>
  );
}

export default App;
