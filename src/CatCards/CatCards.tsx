import React, { useCallback, useEffect, useState } from "react";
import "./CatCards.css";
import OneCard from "./OneCard/OneCard";
import { useParams } from "react-router";

export const API_KEY =
  "live_Q7eypd6MW81skStdAEfxcQ38QkgvudsuucUJkozHuGTJ1Lr0n2ERBqRkTWpvEcZg";
const BASE_URL = "https://api.thecatapi.com/v1/images/search?&limit=15";

export default function CatCards() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [url, setUrl] = useState(BASE_URL);
  const { id } = useParams();

  const loadData = useCallback(async () => {
    setIsLoad(true);
    setError(null);

    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: { "x-api-key": API_KEY },
      });

      !response.ok && setError(`Error of HTTP: ${response.status}`);

      const newData = await response.json();
      setData((prev) => {
        const combined = [...prev, ...newData];
        const filteredData = Array.from(
          new Map(combined.map((item) => [item.id, item])).values(),
        );
        return filteredData;
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoad(false);
    }
  }, [url]);

  useEffect(() => {
    loadData();
  }, [url, loadData]);

  useEffect(() => {
    if (id) {
      setUrl(`${BASE_URL}&${id}`);
      setData([]);
    } else setUrl(BASE_URL);
  }, [id]);

  return (
    <div className="CC-container">
      <h1 className="CC-title">Cat Cards:</h1>
      {isLoad && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {!!data.length && (
        <>
          <div className="CC-cats">
            {data.map((item) => (
              <OneCard key={item.id} data={item} />
            ))}
          </div>
          <button className="СС-button" onClick={loadData}>
            Load more
          </button>
        </>
      )}
    </div>
  );
}
