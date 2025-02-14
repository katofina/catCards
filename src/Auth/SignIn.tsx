import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Sign.scss";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

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
      <h1>Sign In</h1>
      <div className="Sign-group">
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p className="Sign-error">{errors.email.message}</p>}
      </div>
      <div className="Sign-group">
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="Sign-error">{errors.password.message}</p>
        )}
      </div>
      <button type="submit" className="Sign-button">
        Continue
      </button>
      {fbError && (
        <p className="Sign-error">
          Please check the correctness of the entered data or register.
        </p>
      )}
    </form>
  );
}
