import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import Modal from "../../Modal/Modal";
import SignIn from "../../Auth/SignIn";
import SignUp from "../../Auth/SignUp";
import "./HeaderButtons.css";

export default function HeaderButtons() {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    }
    );

    return () => unsubscribe();
  }, []);

  const closeModal = () => setModalType(null);
  const openModal = (type: string) => setModalType(type);
  const logOut = () => signOut(auth);

  if (loading) return null;

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
          <button className="HB-button" onClick={() => openModal("login")}>
            Sign In
          </button>
          <button
            className="HB-button"
            onClick={() => openModal("register")}
          >
            Sign Up
          </button>
        </>
      )}
      <Modal isOpen={!!modalType} onClose={closeModal}>
        {modalType === "login" ? (
          <SignIn close={closeModal} />
        ) : (
          <SignUp close={closeModal} />
        )}
      </Modal>
    </div>
  );
}
