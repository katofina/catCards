import React, { useState } from "react";
import { CatInfo, ModalType } from "../../types/types";
import "./OneCard.css";
import { Link } from "react-router";
import Modal from "../../Modal/Modal";
import { useUserContext } from "../../Context/useUserContext";
import { MODAL_PROPS } from "../../constants/constant";
import { getModalContent } from "../../Modal/getModalContent";
import { ref, set, update } from "firebase/database";
import { db } from "../../firebase/firebase";

interface Props {
  data: CatInfo;
}

export default function OneCard({ data }: Props) {
  const hasCategory = !!data.categories;
  const hasBreed = !!data.breeds.length;

  const [modalType, setModalType] = useState<ModalType | null>(null);
  const closeModal = () => setModalType(null);
  const openModal = (type: ModalType) => setModalType(type);

  const { user } = useUserContext();

  function handleSave() {
    if (user) {
      update(ref(db, `${user.email.split('@')[0]}/`), {[data.id]: data});
    }
    else openModal(MODAL_PROPS.LOGIN);
  }

  return (
    <div className="OC-card">
      <div style={{ left: 15 }} className="OC-ico-container">
        <img src="/download.svg" className="OC-ico" alt="download" />
      </div>
      <div
        style={{ right: 15 }}
        className="OC-ico-container"
        onClick={handleSave}
      >
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
              <img
                src="/learn.svg"
                alt="learn"
                className="OC-learn"
                onClick={() => openModal(MODAL_PROPS.BREED)}
              />
            </>
          ) : (
            "unknown"
          )}
        </p>
      </div>

      <Modal isOpen={!!modalType} onClose={closeModal}>
        {modalType === MODAL_PROPS.LOGIN && (<p className="OC-errorLog">To add to favorites, you need to log in.</p>)}
        {modalType && getModalContent(modalType, closeModal, data.breeds[0])}
      </Modal>
    </div>
  );
}
