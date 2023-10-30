import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import movies from "../data/movies.json";
import "./main.css";

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

const Player = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const movieInfo: Movie = movies.filter(
    (mov) => parseInt(mov.id) === parseInt(params.get("id"))
  );

  return (
    <>
      <div className="container">
        <FaArrowLeft className="video-button" onClick={() => navigate(-1)} />
        <video
          src={"/src/assets/videos/" + movieInfo[0].video}
          autoPlay
          loop
          controls
        />
      </div>
    </>
  );
};

export default Player;
