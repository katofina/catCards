import React, { useEffect, useState } from "react";
import "./CatCards.css";
import OneCard from "./OneCard/OneCard";

export const API_KEY =
  "live_Q7eypd6MW81skStdAEfxcQ38QkgvudsuucUJkozHuGTJ1Lr0n2ERBqRkTWpvEcZg";
const URL = "https://api.thecatapi.com/v1/images/search?limit=15";

export default function CatCards() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    fetch(URL, { method: "GET", headers: { "x-api-key": API_KEY } })
      .then((response) => {
        if (!response.ok) setError(`Ошибка HTTP: ${response.status}`);
        setIsLoad(false);
        return response.json();
      })
      .then((data) => setData(data));
  }, []);

  return (
    <div className="CC-container">
      <h1 className="CC-title">Cat Cards:</h1>
      {isLoad && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {!!data.length && (
        <div className="CC-cats">
          {data.map((item) => (
            <OneCard key={item.id} data={item}/>
          ))}
        </div>
      )}
    </div>
  );
}
