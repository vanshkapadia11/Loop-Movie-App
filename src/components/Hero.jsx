import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [movie, setMovie] = useState(null);

  // TODO: This Is The Main Important Part Or You Can Say Important Code Of The Project!!

  const fetchMovies = async () => {
    const randomPage = Math.floor(Math.random() * 500) + 1; // TMDB allows up to 500 pages
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDM0YTZjNTYxNWFhYTFlZGFmZDQxNjgzNDcxNTM3MyIsIm5iZiI6MTc1MjI5NzUwMS4yMDIsInN1YiI6IjY4NzFmMDFkNzFiNzVhZDM3NGE5Nzk1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oc2Jc_3MG1467ng-V3uLEqgrbCSmqJXig33KZ5XBz0o",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc`,
      options
    );
    const result = await response.json();
    const cleanList = result.results.filter(
      (movie) =>
        !movie.adult &&
        !movie.title.toLowerCase().includes("porn") &&
        !movie.title.toLowerCase().includes("porn") &&
        !movie.title.toLowerCase().includes("xxx")
    );
    setMovie(cleanList);
    localStorage.setItem("movieList", JSON.stringify(cleanList));
  };

  // Handles The Search Thingy!!

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDM0YTZjNTYxNWFhYTFlZGFmZDQxNjgzNDcxNTM3MyIsIm5iZiI6MTc1MjI5NzUwMS4yMDIsInN1YiI6IjY4NzFmMDFkNzFiNzVhZDM3NGE5Nzk1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oc2Jc_3MG1467ng-V3uLEqgrbCSmqJXig33KZ5XBz0o",
        },
      }
    );
    const result = await response.json();
    const cleanList = result.results.filter(
      (movie) =>
        !movie.adult &&
        !movie.title.toLowerCase().includes("porn") &&
        !movie.title.toLowerCase().includes("xxx") &&
        !movie.title.toLowerCase().includes("romance")
    );
    setMovie(cleanList);
  };

  useEffect(() => {
    if (movie) {
      localStorage.setItem("movieList", JSON.stringify(movie));
    }
  }, [movie]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movieList"));
    if (saved) {
      setMovie(saved); // restore from localStorage
    } else {
      fetchMovies(); // only fetch if nothing saved
    }
  }, []);

  const getMovies = async () => {
    fetchMovies(); // this still fetches and updates
  };
  return (
    <>
      <Header />
      <section className="container1">
        <div className="flex items-center flex-col justify-center text-center mt-10">
          <h2 className="text-3xl font-semibold heading uppercase">
            movie app
          </h2>
          <div className="flex gap-4 items-center mt-6">
            <input
              type="text"
              placeholder="Search movies..."
              className="p-3 uppercase rounded-md outline-none text-sm font-semibold dark:bg-zinc-900 dark:text-white bg-white text-black ring-1 ring-zinc-300 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="p-4 bg-[#f9f9f9] font-semibold text-sm rounded-xl ring-1 ring-inset ring-[#e8e8e8] uppercase"
            >
              Search
            </button>
          </div>
          <button
            className="p-2 bg-[#f9f9f9] font-semibold text-sm mt-10 rounded-xl ring-1 ring-inset ring-[#e8e8e8]"
            onClick={getMovies}
          >
            GENERATE RANDOM MOVIES!!
          </button>
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 px-4 uppercase">
              {movie &&
                movie.map((film, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => navigate(`/movie/${film.id}`)}
                  >
                    {film.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={film.title}
                        className="w-full h-72 object-cover"
                      />
                    )}
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold text-zinc-800  dark:text-white">
                        {film.title}
                      </h3>
                      <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        📅 Release: {film.release_date}
                      </p>
                      <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        ⭐ Rating: {film.vote_average}
                      </p>
                      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 line-clamp-3">
                        {film.overview}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hero;
