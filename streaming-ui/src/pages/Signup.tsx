import { lazy, Suspense, useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorBoundary from "../utils/ErrorBoundary";
import "./index.css";
import "./signup.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

interface UserInfo {
  email: string;
  password: string;
}

const Signup = () => {
  const [params] = useSearchParams();
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required(t("EmailRequired")).email(t("InvalidEmail")),
    password: yup
      .string()
      .min(8, t("PassLenght"))
      .max(32, t("PassLenght"))
      .required(t("PassRequired")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (data) => {
    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password
      );
      reset();
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="background background-image-2"></div>
      <div className="container">
        <ErrorBoundary>
          <Suspense fallback={t("Loading")}>
            <Header title="Signup" />
          </Suspense>
        </ErrorBoundary>
        <div className="signup">
          <div className="signup-title">{t("SignupMoto")}</div>
          <div className="signup-description">{t("SignupDescription")}</div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="signup-div">
              <span className="signup-div-title">{t("EmailAddress")}</span>
              <input
                {...register("email")}
                className="signup-div-input"
                placeholder={t("EmailAddress")}
                value={params.get("email")}
              />
              {errors.email?.message && (
                <span className="signup-warning">{errors.email?.message}</span>
              )}
            </div>
            <div className="signup-div">
              <span className="signup-div-title">{t("Password")}</span>
              <input
                {...register("password")}
                className="signup-div-input"
                placeholder=""
                type="password"
              />
              {errors.password?.message && (
                <span className="signup-warning">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <button type="submit" className="signup-div-button">
              {t("Save")}
            </button>
            {error && <div className="signup-warning">{error}</div>}
          </form>
        </div>
        <div className="signup-div-gap"></div>
      </div>
      <ErrorBoundary>
        <Suspense fallback={t("Loading")}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Signup;
