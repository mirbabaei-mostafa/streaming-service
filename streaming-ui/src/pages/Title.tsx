import { useState, lazy, Suspense, useEffect } from "react";
import movies from "../data/movies.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPlus } from "react-icons/fa";
import "./main.css";
import { styled } from "styled-components";
import "../utils/Constants";
import { useDispatch } from "react-redux";
import { getGenres } from "../app/store";
const Navbar = lazy(() => import("../components/Navbar"));

interface Movie {
  id: number;
  name: string;
  year: number;
  duration: number;
  genre: string[];
  director: string;
  stars: string[];
  summary: string;
  logo: string;
  poster: string;
  background: string;
  video: string;
}

const Title = () => {
  const [isScrolled, setScrolled] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  const movieid: number = 1;
  const movieInfo: Movie = movies.filter((mov) => mov.id === movieid);
  let durations = "";
  if (parseInt(movieInfo[0].duration) < 60) {
    durations = movieInfo[0].duration + "min";
  } else {
    durations =
      Math.round(parseInt(movieInfo[0].duration) / 60) +
      "h " +
      (parseInt(movieInfo[0].duration) % 60) +
      "min";
  }

  window.onscroll = () => {
    setScrolled(window.scrollY === 0 ? false : true);
  };

  return (
    <>
      <div className="container">
        <div className="background">
          <img src={"/src/assets/moviesbg/" + movieInfo[0].background} />
        </div>
        <Navbar isScrolled={isScrolled} />
        <div className="title-container">
          <div className="title-box">
            <div className="title-box-item">
              <img
                src={"/src/assets/logo/" + movieInfo[0].logo}
                className="title-box-logo"
                alt={movieInfo[0].name}
              />
            </div>
            <div className="title-box-item title-box-genre">
              {movieInfo[0].genre
                .map((g) => {
                  return g;
                })
                .join(" | ")}
            </div>
            <div className="title-box-item title-box-info">
              {movieInfo[0].year} | {durations}
            </div>
            <div className="title-box-item">
              <span className="title-box-crew">{t("Director")}:</span>{" "}
              <span className="title-box-crew-info">
                {movieInfo[0].director}
              </span>
            </div>
            <div className="title-box-item">
              <span className="title-box-crew">{t("Stars")}:</span>{" "}
              <span className="title-box-crew-info">
                {movieInfo[0].stars
                  .map((g) => {
                    return g;
                  })
                  .join(" | ")}
              </span>
            </div>
            <div className="title-box-item title-box-summary">
              {movieInfo[0].summary}
            </div>
            <div className="title-box-item">
              <button
                className="title-box-play"
                onClick={() => navigate("/player?id=" + movieInfo[0].id)}
              >
                <FaPlay className="play-button" />
                {t("Play")}
              </button>
              <button
                className="title-box-mylist"
                onClick={() => navigate("/player?id=" + movieInfo[0].id)}
              >
                <FaPlus className="play-button" />
                {t("AddToList")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
