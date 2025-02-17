import React, { useEffect, useState } from "react";
import { CatInfo, ModalType } from "../../types/types";
import "./OneCard.scss";
import { Link } from "react-router";
import Modal from "../../Modal/Modal";
import { useUserContext } from "../../Context/useUserContext";
import { MODAL_PROPS } from "../../constants/constant";
import { getModalContent } from "../../Modal/getModalContent";
import { get, ref, remove, set } from "firebase/database";
import { db } from "../../firebase/firebase";
import { useTranslation } from "react-i18next";

interface Props {
  data: CatInfo;
}

export default function OneCard({ data }: Props) {
  const hasCategory = !!data.categories;
  const hasBreed = data.breeds && data.breeds.length;

  const [modalType, setModalType] = useState<ModalType | null>(null);
  const closeModal = () => setModalType(null);
  const openModal = (type: ModalType) => setModalType(type);

  const { t } = useTranslation();

  const { user } = useUserContext();
  const userFavouriteRef = user
    ? ref(db, `${user.email.split("@")[0]}/${data.id}`)
    : null;

  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    if (userFavouriteRef) {
      get(userFavouriteRef).then((snap) => {
        if (snap.exists()) setIsFavorited(true);
        else setIsFavorited(false);
      });
    }
  }, [userFavouriteRef]);

  function handleSave() {
    if (user) {
      if (isFavorited) {
        remove(userFavouriteRef);
      } else set(userFavouriteRef, data);
      setIsFavorited(!isFavorited);
    } else openModal(MODAL_PROPS.LOGIN);
  }

  return (
    <div className="OC-card">
      <div style={{ left: 15 }} className="OC-ico-container">
        <img src="/download.svg" className="OC-ico" alt={t("download")} />
      </div>
      <div
        style={{ right: 15 }}
        className="OC-ico-container"
        onClick={handleSave}
      >
        <img
          src="/save.svg"
          className={`OC-ico ${isFavorited ? "favorited" : ""}`}
          alt={t("save")}
        />
      </div>

      <img className="OC-img" src={data.url} alt="" id={data.id} />

      <div className="OC-info">
        <p className={hasCategory ? "OC-known" : "OC-unknown"}>
          {t("category")}
          {hasCategory ? (
            <Link
              to={`/catcards/category_ids=${data.categories[0].id}`}
              color="green"
            >
              {data.categories[0].name}
            </Link>
          ) : (
            t("unknown")
          )}
        </p>

        <p className={hasBreed ? "OC-known" : "OC-unknown"}>
          {t("breed")}
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
                alt={t("learn")}
                className="OC-learn"
                onClick={() => openModal(MODAL_PROPS.BREED)}
              />
            </>
          ) : (
            t("unknown")
          )}
        </p>
      </div>

      <Modal isOpen={!!modalType} onClose={closeModal}>
        {modalType === MODAL_PROPS.LOGIN && (
          <p className="OC-errorLog">
            {t("needLogIn")}
          </p>
        )}
        {modalType && getModalContent(modalType, closeModal, data.breeds[0])}
      </Modal>
    </div>
  );
}
