import React, { useEffect, useState } from "react";
import "./CatCards.scss";
import OneCard from "./OneCard/OneCard";
import { useParams } from "react-router";
import { API_KEY, BASE_URL } from "../constants/constant";
import Search from "./Search/Search";
import { useTranslation } from "react-i18next";

export default function CatCards() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [url, setUrl] = useState(BASE_URL);
  const { id } = useParams();

  const { t } = useTranslation();

  const loadData = async () => {
    setIsLoad(true);
    setError(null);

    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: { "x-api-key": API_KEY },
      });

      !response.ok && setError(t("httpError") + response.status);

      const newData = await response.json();

      setData((prev) => {
        const combined = [...prev, ...newData];

        const filteredData = Array.from(
          new Map(combined.map((item) => [item.id, item])).values(),
        );

        filteredData.length === prev.length && setIsDisabled(true);
        return filteredData;
      });
    } catch (err) {
      setError(t("error") + err.message);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [url]);

  useEffect(() => {
    if (id) {
      setUrl(`${BASE_URL}&${id}`);
      setData([]);
    } else setUrl(BASE_URL);
  }, [id]);

  return (
    <div className="CC-container">
      <div className="CC-title">
        <Search />
      </div>
      {!!data.length && (
        <>
          <div className="CC-cats">
            {data.map((item) => (
              <OneCard key={item.id} data={item} />
            ))}
          </div>
          <button
            className="СС-button"
            disabled={isDisabled}
            onClick={loadData}
          >
            {t("loadMore")}
          </button>
        </>
      )}
      <div className={`CC-extra ${isLoad && "loading"}`}>
        {error && <h1 className="error">{error}</h1>}
        {isLoad && !error && <h1>{t("loading")}</h1>}
      </div>
    </div>
  );
}
