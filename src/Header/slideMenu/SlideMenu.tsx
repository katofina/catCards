import React, { useState } from "react";
import "./SlideMenu.scss";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../Context/useUserContext";
import SwitchLangButtons from "../buttons/SwitchLangButtons/SwitchLangButtons";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { ModalType } from "../../types/types";
import Modal from "../../Modal/Modal";
import { getModalContent } from "../../Modal/getModalContent";
import { MODAL_PROPS } from "../../constants/constant";

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function SlideMenu({ isOpen, toggleMenu }: Props) {
  const { t } = useTranslation();
  const { user } = useUserContext();

  const navigate = useNavigate();
  const handleProfile = () => {
    toggleMenu();
    navigate("/profile");
  };
  const handleSignOut = () => {
    toggleMenu();
    signOut(auth)
  };

    const [modalType, setModalType] = useState<ModalType | null>(null);
  const closeModal = () => setModalType(null);
  const openModal = (type: ModalType) => setModalType(type);

  const handleSignIn = () => {
    toggleMenu();
    openModal(MODAL_PROPS.LOGIN);
  };
  const handleSignUp = () => {
    toggleMenu();
    openModal(MODAL_PROPS.REGISTER);
  };

  return (
    <div className={`SM-container ${isOpen ? "open" : ""}`}>
      <img
        src="./close.svg"
        className="SM-close"
        alt={t("close")}
        onClick={toggleMenu}
      />
      <nav className="SM-nav">
        <ul>
          {user ? (
            <>
              <li>
                <button className="SM-buttons" onClick={handleProfile}>{t("profile")}</button>
              </li>
              <li>
                <button className="SM-buttons" onClick={handleSignOut}>{t("signOut")}</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="SM-buttons" onClick={handleSignIn}>{t("signIn")}</button>
              </li>
              <li>
                <button className="SM-buttons" onClick={handleSignUp}>{t("signUp")}</button>
              </li>
            </>
          )}
          <li>
            <p>{t("languages")}</p>
            <SwitchLangButtons/>
          </li>
        </ul>
      </nav>
      <Modal isOpen={!!modalType} onClose={closeModal}>
        {modalType && getModalContent(modalType, closeModal)}
      </Modal>
    </div>
  );
}
