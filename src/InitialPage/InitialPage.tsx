import React from "react";
import "./InitialPage.scss";
import { useTranslation } from "react-i18next";

export default function InitialPage() {
  const { t } = useTranslation();

  return (
    <div className="IP-main">
      <h1 className="IP-text">{t('initialText')}</h1>
      <a href="/catcards" className="IP-button">
        {t('goAhead')}
      </a>
    </div>
  );
}
