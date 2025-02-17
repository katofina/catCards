import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Sign.scss";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useTranslation } from "react-i18next";

interface FormData {
  email: string;
  password: string;
}

interface Prop {
  close: () => void;
}

export default function SignIn({ close }: Prop) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [fbError, setFbError] = useState(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = (data: FormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        close();
        navigate("/");
      })
      .catch((err) => setFbError(err.message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Sign-form">
      <h1>{t("signIn")}</h1>
      <div className="Sign-group">
        <label>{t("email")}</label>
        <input
          type="email"
          {...register("email", {
            required: t("emailRequired"),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("invalidEmail"),
            },
          })}
        />
        {errors.email && <p className="Sign-error">{errors.email.message}</p>}
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
      {fbError && (
        <p className="Sign-error">
          {t("loginError")}
        </p>
      )}
    </form>
  );
}
