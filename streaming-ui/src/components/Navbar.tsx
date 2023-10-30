import React, { useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaSearch, FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";

interface Link<Array> {
  name: string;
  link: string;
}

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/signin");
  });
  const { t } = useTranslation();
  const [isSearchBox, setSearchBox] = useState<boolean>(false);
  const navLinks: Link = [
    { name: "Home", link: "/" },
    { name: "TVShows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "Favorites", link: "/favorites" },
  ];
  return (
    <div
      className={`navbar-container ${isScrolled ? "navbar-container-bg" : ""} `}
    >
      <div className="navbar-container ">
        <div className="navbar-box">
          <img
            src="/src/assets/logo/netflix.png"
            className="navbar-item-logo"
          />
          {navLinks.map((nav) => {
            return (
              <div className="navbar-item-menu" key={nav.name}>
                <Link to={nav.link}>{t(nav.name)}</Link>
              </div>
            );
          })}
        </div>
        <div className="navbar-box-icons">
          <span onClick={() => setSearchBox(!isSearchBox)}>
            <FaSearch size={24} />
          </span>
          <span
            onClick={() => signOut(firebaseAuth)}
            className="navbar-box-icons-red"
          >
            <FaPowerOff size={24} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
