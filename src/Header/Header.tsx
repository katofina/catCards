import React, { useState } from "react";
import "./Header.scss";
import HeaderButtons from "./buttons/HeaderButtons";
import SwitchLangButtons from "./buttons/SwitchLangButtons/SwitchLangButtons";
import SlideMenu from "./slideMenu/SlideMenu";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { t } = useTranslation();

  return (
    <div className="Header">
      <div className="Header-title">
        <a className="Header-title-ref" href="/">
          <h1>CatCards</h1>
        </a>
      </div>
      <button className="Header-menu-button" onClick={toggleMenu}>
        <img src="/menu.svg" className="Header-menu" alt={t("menu")} />
      </button>
      <SlideMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className="Header-buttons">
        <span className="SLB-text">{t("languages")}</span>
        <SwitchLangButtons />

        <HeaderButtons />
      </div>
    </div>
  );
}
