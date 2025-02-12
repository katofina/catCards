import React from "react";
import BreedCard from "../CatCards/OneCard/BreedInfo/BreedCard";
import { MODAL_PROPS } from "../constants/constant";
import { BreedInfo, ModalType } from "../types/types";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";

export const getModalContent = (
  type: ModalType,
  onClose?: () => void,
  data?: BreedInfo,
) => {
  const ModalContent = {
    [MODAL_PROPS.BREED]: <BreedCard data={data} />,
    [MODAL_PROPS.LOGIN]: <SignIn close={onClose} />,
    [MODAL_PROPS.REGISTER]: <SignUp close={onClose} />,
  };
  return ModalContent[type];
};
