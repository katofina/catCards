import React from "react";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return createPortal(
    <div className="Modal-overlay" onClick={onClose}>
      <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="Modal-close" onClick={onClose}>
          <img src="/close.svg" alt="close" />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
