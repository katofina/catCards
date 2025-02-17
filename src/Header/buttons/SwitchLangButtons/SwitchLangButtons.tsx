import React from "react";
import { useTranslation } from "react-i18next";
import "./SwitchLangButtons.scss";

export default function SwitchLangButtons() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  }

  const isEn = i18n.language === "en";
  const isRu = i18n.language === "ru";

  return (
    <div className="SLB-container">
      <button className={`SLB-button ${isEn ? "active" : ""}`} onClick={() => handleChangeLanguage("en")}>en</button>
      <button className={`SLB-button ${isRu ? "active" : ""}`} onClick={() => handleChangeLanguage("ru")}>ru</button>
    </div>
  );
}
