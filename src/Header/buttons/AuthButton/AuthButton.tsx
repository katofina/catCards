import React from "react";
import "./AuthButton.scss";

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
