import React, { useCallback, useState } from "react";
import { CatInfo } from "./types/types";
import "./OneCard.css";
import { Link } from "react-router";
import Modal from "../../Modal/Modal";
import BreedCard from "./BreedInfo/BreedCard";

interface Props {
  data: CatInfo;
}

export default function OneCard({ data }: Props) {
  const hasCategory = !!data.categories;
  const hasBreed = !!data.breeds.length;

  const [isModal, setIsModal] = useState(false);
  const openModal = useCallback(() => setIsModal(true), []);
  const closeModal = useCallback(() => setIsModal(false), []);

  return (
    <div className="OC-card">
      <div style={{ left: 15 }} className="OC-ico-container">
        <img src="/download.svg" className="OC-ico" alt="download" />
      </div>
      <div style={{ right: 15 }} className="OC-ico-container">
        <img src="/save.svg" className="OC-ico" alt="download" />
      </div>

      <img className="OC-img" src={data.url} alt="" id={data.id} />

      <div className="OC-info">
        <p className={hasCategory ? "OC-known" : "OC-unknown"}>
          Category:{" "}
          {hasCategory ? (
            <Link
              to={`/catcards/category_ids=${data.categories[0].id}`}
              color="green"
            >
              {data.categories[0].name}
            </Link>
          ) : (
            "unknown"
          )}
        </p>

        <p className={hasBreed ? "OC-known" : "OC-unknown"}>
          Breed:{" "}
          {hasBreed ? (
            <>
              <Link
                to={`/catcards/breed_ids=${data.breeds[0].id}`}
                color="green"
              >
                {data.breeds[0].name}
              </Link>
              <img src="/learn.svg" alt="learn" className="OC-learn" onClick={openModal}/>
            </>
          ) : (
            "unknown"
          )}
        </p>
      </div>

      <Modal isOpen={isModal} onClose={closeModal}>
        <BreedCard data={data.breeds[0]}/>
      </Modal>
    </div>
  );
}
