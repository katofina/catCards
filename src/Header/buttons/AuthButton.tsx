import React from "react";
import "./AuthButton.css";

interface Props {
  onClick: () => void;
  text: string;
}

export const AuthButton = ({ onClick, text }: Props) => {
  return (
    <button className="AuthButton" onClick={onClick}>
      {text}
    </button>
  );
};
