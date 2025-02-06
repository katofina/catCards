import React, { useEffect, useState } from "react";
import "./CatCards.css";

const API_KEY =
  "live_Q7eypd6MW81skStdAEfxcQ38QkgvudsuucUJkozHuGTJ1Lr0n2ERBqRkTWpvEcZg";
const URL = "https://api.thecatapi.com/v1/images/search?limit=15";

export default function CatCards() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(true);

  console.log(data);

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
            <div className="CC-card" key={item.id}>
              <img className="CC-img" src={item.url} alt="" />
              <div className="CC-info">
                <p className="CC-category">Category: {item.categories ? item.categories[0].name : "unknown"}</p>
                <p className="CC-breed">Breed: {item.breeds.length ? item.breeds[0].name : "unknown"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
