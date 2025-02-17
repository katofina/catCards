import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import Modal from "../../Modal/Modal";
import "./HeaderButtons.scss";
import { useUserContext } from "../../Context/useUserContext";
import { AuthButton } from "./AuthButton/AuthButton";
import { MODAL_PROPS } from "../../constants/constant";
import { ModalType } from "../../types/types";
import { getModalContent } from "../../Modal/getModalContent";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function HeaderButtons() {
  const { user, isLoading } = useUserContext();

  const { t } = useTranslation();

  const [modalType, setModalType] = useState<ModalType | null>(null);
  const closeModal = () => setModalType(null);
  const openModal = (type: ModalType) => setModalType(type);

  const navigate = useNavigate();
  const navigateToProfile = () => navigate("/profile");

  const logOut = () => signOut(auth);

  if (isLoading) return;

  return (
    <div className="HB-container">
      {user ? (
        <>
          <AuthButton onClick={navigateToProfile} text={t("profile")} />
          <AuthButton onClick={logOut} text={t("signOut")} />
        </>
      ) : (
        <>
          <AuthButton
            onClick={() => openModal(MODAL_PROPS.LOGIN)}
            text={t("signIn")}
          />
          <AuthButton
            onClick={() => openModal(MODAL_PROPS.REGISTER)}
            text={t("signUp")}
          />
        </>
      )}
      <Modal isOpen={!!modalType} onClose={closeModal}>
        {modalType && getModalContent(modalType, closeModal)}
      </Modal>
    </div>
  );
}
