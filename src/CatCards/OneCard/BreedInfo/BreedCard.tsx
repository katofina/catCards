import { BreedInfo } from "../../../types/types";
import "./BreedCard.scss";
import React from "react";
import { BREED_PROPS } from "../../../constants/constant";
import { useTranslation } from "react-i18next";

interface Props {
  data: BreedInfo;
}

export default function BreedCard({ data }: Props) {
  const { t } = useTranslation();

  return (
    <div className="BC-container">
      {BREED_PROPS.map((item) => {
        const newItem = (item[0].toUpperCase() + item.slice(1)).replace(
          "_",
          " ",
        );

        return (
          <div className="BC-row">
            <p className="BC-property">{t(newItem)}:</p>
            <p className="BC-description">{data[item]}</p>
          </div>
        );
      })}
    </div>
  );
}
