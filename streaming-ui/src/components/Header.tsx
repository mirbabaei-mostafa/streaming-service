import { Navigate, useNavigate } from "react-router-dom";
import langs from "../data/languages.json";
import { useTranslation } from "react-i18next";

const Header = ({ title }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-logo">
        <img
          src="/src/assets/logo/netflix.png"
          onClick={() => navigate("/")}
          className="header-logo-image"
        />
        {title && (
          <>
            <span className="header-logo-title-divide">|</span>{" "}
            <span className="header-title">{t(title)}</span>
          </>
        )}
      </div>
      <div className="header-menu">
        <div>
          <select
            className="header-select"
            onChange={(event) => i18n.changeLanguage(event.target.value)}
          >
            {langs.map((lang) => {
              return (
                <option value={lang.language} key={lang.language}>
                  {t(lang.name)}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className="button-1" onClick={() => navigate("/signin")}>
            {t("Signin")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
