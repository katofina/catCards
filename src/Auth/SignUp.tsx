import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Sign.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface FormData {
  email: string;
  password: string;
}

interface Prop {
  close: () => void;
}

export default function SignUp({ close }: Prop) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [fbError, setFbError] = useState(null);

  const onSubmit = (data: FormData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        close();
        navigate("/");
      })
      .catch((err) => setFbError(err.message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Sign-form">
      <h1>{t("signUp")}</h1>
      <div className="Sign-group">
        <label>{t("email")}</label>
        <input
          type="email"
          {...register("email", {
            required: t("emailRequired"),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t("invalidEmail"),
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="Sign-group">
        <label>{t("password")}</label>
        <input
          type="password"
          {...register("password", {
            required: t("passwordRequired"),
            minLength: {
              value: 6,
              message: t("invalidPassword"),
            },
          })}
        />
        {errors.password && (
          <p className="Sign-error">{errors.password.message}</p>
        )}
      </div>
      <button type="submit" className="Sign-button">
        {t("continue")}
      </button>
      {fbError && <p className="Sign-error">{fbError}</p>}
    </form>
  );
}
