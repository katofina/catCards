import { get, onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../Context/useUserContext";
import { CatInfo } from "../types/types";
import "./Profile.scss";
import OneCard from "../CatCards/OneCard/OneCard";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useUserContext();

  const [data, setData] = useState([]);
  const [err, setError] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `${user.email.split("@")[0]}/`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const obj = snapshot.val();
            const arr = Object.values(obj);
            setData(arr);
          }
        })
        .catch((err) => setError(err.message));

      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const obj = snapshot.val();
          const arr = Object.values(obj);
          setData(arr);
        } else setData([]);
      });
    }
  }, [user]);

  return (
    <div className="Profile-container">
      <h1>{t("savedPhotos")}</h1>
      <div className="Profile-gallery">
        {err && <p>{err}</p>}
        {data.length ? (
          data.map((item: CatInfo) => <OneCard key={item.id} data={item} />)
        ) : (
          <p>{t("noPhotos")}</p>
        )}
      </div>
    </div>
  );
}
