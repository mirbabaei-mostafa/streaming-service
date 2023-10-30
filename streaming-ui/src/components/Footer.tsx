import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const today = new Date();
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <Link to="/contactus">{t("ContactUs")}</Link>
        </div>
      </div>
      <div className="footer-menu">
        <div className="footer-menu-item">
          <Link to="/faq">{t("FAQ")}</Link>
          <Link to="/">{t("InvestorRelations")}</Link>
          <Link to="/">{t("WaysToWatch")}</Link>
          <Link to="/">{t("CorporateInformation")}</Link>
          <Link to="/">{t("LegalNotices")}</Link>
        </div>
        <div className="footer-menu-item">
          <Link to="/helpcenter">{t("HelpCentre")}</Link>
          <Link to="/jobs">{t("Jobs")}</Link>
          <Link to="/contactus">{t("ContactUs")}</Link>
          <Link to="/faq">{t("FAQ")}</Link>
          <Link to="/onlyonnetflix">{t("OnlyOnNetflix")}</Link>
        </div>
        <div className="footer-menu-item">
          <Link to="/account">{t("Account")}</Link>
          <Link to="/gitcard">{t("RedeemGiftCards")}</Link>
          <Link to="/privacy">{t("Privacy")}</Link>
          <Link to="/speedtest">{t("SpeedTest")}</Link>
          <Link to="/advertchoices">{t("AdvertChoices")}</Link>
        </div>
        <div className="footer-menu-item">
          <Link to="/media">{t("MediaCentre")}</Link>
          <Link to="/buygitcard">{t("BuyGiftCards")}</Link>
          <Link to="/cookie">{t("CookiePreferences")}</Link>
          <Link to="/legal">{t("LegalGuarantee")}</Link>
        </div>
      </div>
      <span>© {today.getFullYear()} Netflix</span>
    </div>
  );
};

export default Footer;
