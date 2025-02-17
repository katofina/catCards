import React from "react";
import { useTranslation } from "react-i18next";
import "./SwitchLangButtons.scss";
import { LANGS } from "../../../constants/constant";

export default function SwitchLangButtons() {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="SLB-container">
      <div className="SLB-button-container">
        {LANGS.map((lang) => (
        <button
          key={lang}
          className={`SLB-button ${i18n.language === lang ? "active" : ""}`}
          onClick={() => handleChangeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
      </div>
    </div>
  );
}
