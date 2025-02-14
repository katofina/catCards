import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import Modal from "../../Modal/Modal";
import "./HeaderButtons.scss";
import { useUserContext } from "../../Context/useUserContext";
import { AuthButton } from "./AuthButton";
import { MODAL_PROPS } from "../../constants/constant";
import { ModalType } from "../../types/types";
import { getModalContent } from "../../Modal/getModalContent";
import { useNavigate } from "react-router";

export default function HeaderButtons() {
  const { user, isLoading } = useUserContext();

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
          <AuthButton onClick={navigateToProfile} text="Profile" />
          <AuthButton onClick={logOut} text="Sign Out" />
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
