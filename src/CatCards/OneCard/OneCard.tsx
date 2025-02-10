import React from "react";
import { CatInfo } from "./types/types";
import "./OneCard.css";
import { Link } from "react-router";

interface Props {
  data: CatInfo;
}

export default function OneCard({ data }: Props) {
  const isCategory = !!data.categories;
  const isBreed = !!data.breeds.length;

  return (
    <div className="OC-card" key={data.id}>
      <div style={{left: 15}} className="OC-ico-container">
        <img src="/download.svg" className="OC-ico" alt="download"/>
      </div>
      <div style={{right: 15}} className="OC-ico-container">
        <img src="/save.svg" className="OC-ico" alt="download"/>
      </div>
      <img className="OC-img" src={data.url} alt="" id={data.id}/>
      <div className="OC-info">
        <p className={isCategory ? "OC-known": "OC-unknown"}>
          Category: {isCategory ? <Link to={`/catcards/category_ids=${data.categories[0].id}`} color="green">{data.categories[0].name}</Link>: "unknown"}
        </p>
        <p className={isBreed ? "OC-known": "OC-unknown"}>
          Breed: {isBreed ? <Link to={`/catcards/breed_ids=${data.breeds[0].id}`} color="green">{data.breeds[0].name}</Link> : "unknown"}
        </p>
      </div>
    </div>
  );
}
