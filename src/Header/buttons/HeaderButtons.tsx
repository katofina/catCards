import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import Modal from "../../Modal/Modal";
import "./HeaderButtons.css";
import { useUserContext } from "../../Context/useUserContext";
import { AuthButton } from "./AuthButton";
import { MODAL_PROPS } from "../../constants/constant";
import { ModalType } from "../../types/types";
import { getModalContent } from "../../Modal/getModalContent";

export default function HeaderButtons() {
  const { user } = useUserContext();

  const [modalType, setModalType] = useState<ModalType | null>(null);
  const closeModal = () => setModalType(null);
  const openModal = (type: ModalType) => setModalType(type);

  const logOut = () => signOut(auth);

  return (
    <div className="HB-container">
      {user ? (
        <>
          <button className="HB-button">Profile</button>
          <button className="HB-button" onClick={logOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <AuthButton
            onClick={() => openModal(MODAL_PROPS.LOGIN)}
            text="Sign In"
          />
          <AuthButton
            onClick={() => openModal(MODAL_PROPS.REGISTER)}
            text="Sign Up"
          />
        </>
      )}
      <Modal isOpen={!!modalType} onClose={closeModal}>
        {modalType && getModalContent(modalType, closeModal)}
      </Modal>
    </div>
  );
}
