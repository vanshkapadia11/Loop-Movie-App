import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDM0YTZjNTYxNWFhYTFlZGFmZDQxNjgzNDcxNTM3MyIsIm5iZiI6MTc1MjI5NzUwMS4yMDIsInN1YiI6IjY4NzFmMDFkNzFiNzVhZDM3NGE5Nzk1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oc2Jc_3MG1467ng-V3uLEqgrbCSmqJXig33KZ5XBz0o", // Replace with your Bearer token
          },
        }
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-center mt-20 text-white">Loading...</p>;

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-[f9f9f9]">
        {/* 🔥 Backdrop Image */}

        {/* ✅ Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
          {/* 🎞️ Movie Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-[300px] rounded-xl shadow-lg"
          />

          {/* 📄 Info */}
          <div className="space-y-6 max-w-3xl uppercase text-zinc-800 dark:text-white bg-transparent shadow-lg backdrop-blur-2xl px-4 py-8 lg:p-10 md:p-8 rounded-xl">
            <h1 className="text-4xl font-bold heading">{movie.title}</h1>
            <p className="italic font-semibold text-md">{movie.tagline}</p>
            <p className="text-sm font-semibold leading-relaxed ">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm font-semibold ">
              <span className="bg-transparent shadow-lg backdrop-blur-sm px-3 py-1 rounded-md">
                🎬 {movie.release_date}
              </span>
              <span className="bg-transparent shadow-lg backdrop-blur-sm px-3 py-1 rounded-md">
                ⭐ {movie.vote_average} / 10
              </span>
              <span className="bg-transparent shadow-lg  backdrop-blur-lg px-3 py-1 rounded-md">
                ⏱️ {movie.runtime} mins
              </span>
              <span className="bg-transparent shadow-lg backdrop-blur-sm px-3 py-1 rounded-md">
                {movie.status}
              </span>
            </div>

            {/* 🔙 Back Button */}
            <button
              onClick={() => navigate(-1) || navigate("/")}
              className="mt-6 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition uppercase"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
