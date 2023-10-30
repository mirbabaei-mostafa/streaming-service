import { lazy, Suspense, useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import ErrorBoundary from "../utils/ErrorBoundary";
import "./index.css";
import "./signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

interface UserInfo {
  email: string;
  password: string;
}

const Signin = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string>("");
  const [userAuth, setUserAuth] = useState<UserInfo>();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t("EmailRequired"))
      .email(t("InvalidEmailAlert")),
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
      await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
      setUserAuth({ email: data.email, password: data.password });
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
      <div className="background background-image-3"></div>
      <div className="container">
        <ErrorBoundary>
          <Suspense fallback={t("Loading")}>
            <Header title="Signin" />
          </Suspense>
        </ErrorBoundary>
        <div className="signin">
          <div className="signin-title">{t("Sign-in")}</div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="signin-div">
              <span className="signin-div-title">{t("EmailAddress")}</span>
              <input
                {...register("email")}
                className="signin-div-input"
                placeholder={t("EmailAddress")}
              />
              {errors.email?.message && (
                <span className="signin-warning">{errors.email?.message}</span>
              )}
            </div>
            <div className="signin-div">
              <span className="signin-div-title">{t("Password")}</span>
              <input
                {...register("password")}
                className="signin-div-input"
                placeholder=""
                type="password"
              />
              {errors.password?.message && (
                <span className="signin-warning">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <button type="submit" className="signin-div-button">
              {t("Sign-in")}
            </button>
            <div className="signin-div-row">
              <div className="signin-div-row-left">
                <label
                  htmlFor="remember-me"
                  className="signin-div-row-checkbox"
                >
                  <input type="checkbox" id="remember-me" />
                  {t("RememberMe")}
                </label>
              </div>
              <div className="signin-div-row-right">
                <Link to="/loginhelp">{t("NeedHelp")}</Link>
              </div>
            </div>
            {error && <div className="signin-warning">{error}</div>}
          </form>
          <div className="signin-subtitle">
            {t("NewToNetflix")} <Link to="/signup">{t("SignUpNow")}</Link>
          </div>
          <div className="signin-description">
            {t("reCAPTCHA")} <Link to="/signup">{t("LearnMore")}</Link>
          </div>
        </div>
        <div className="signin-div-gap"></div>
      </div>
      <ErrorBoundary>
        <Suspense fallback={t("Loading")}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Signin;
