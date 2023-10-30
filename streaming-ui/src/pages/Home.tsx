import { lazy, Suspense, useEffect } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../utils/ErrorBoundary";
import "./index.css";
import "./home.css";
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup.string().required(t("EmailRequired")).email(t("InvalidEmail")),
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
    },
  });

  const onSubmitHandler = (data) => {
    navigate("/signup?email=" + data.email);
    reset();
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/movies");
  });

  return (
    <>
      <div className="background background-image-1"></div>
      <div className="container">
        <ErrorBoundary>
          <Suspense fallback={t("Loading")}>
            <Header title="Home" />
          </Suspense>
        </ErrorBoundary>
        <div className="getstarted">
          <div className="getstarted-title">{t("StartMoto")}</div>
          <div className="getstarted-subtitle">{t("StartSubtitle")}</div>
          <div className="getstarted-description">{t("StartDescription")}</div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="getstarted-form">
              <input
                {...register("email")}
                className="getstarted-input"
                placeholder={t("EmailAddress")}
              />
              <button type="submit" className="getstarted-button">
                {t("GetStarted")}
              </button>
            </div>
          </form>
          <div className="getstarted-warning">{errors.email?.message}</div>
        </div>
      </div>
      <ErrorBoundary>
        <Suspense fallback={t("Loading")}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Home;
