import React, { useState } from "react";

const API_KEY = "b2b5c272d6306e1722221a67c7b27bee";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300"; // Adjust the size as per your requirement

function Movie() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setMovie(data.results[0]); // Display content of the first movie
        setNoResults(false);
      } else {
        setMovie(null); // Clear movie content if no results found
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  const renderStarRating = (rating) => {
    const filledStars = "\u2605".repeat(Math.floor(rating / 2)); // Unicode for filled star
    const halfStar = rating % 2 !== 0 ? "\u00BD" : ""; // Unicode for half star
    const emptyStars = "\u2606".repeat(5 - Math.ceil(rating / 2)); // Unicode for empty star
    return (
      <span style={{ color: "gold" }}>
        {filledStars}
        {halfStar}
        {emptyStars}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 mt-2 text-blue-500">
          ChalChitraCharcha
        </h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none"
            placeholder="Search for a movie..."
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Search
          </button>
        </form>
        {movie && (
          <div className="flex justify-center items-center">
            {movie.poster_path && (
              <div className="mr-8 ml-3">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-auto h-72"
                  style={{ maxHeight: "300px", maxWidth: "400px" }}
                />
              </div>
            )}
            <div className="text-left">
              <h2 className="text-2xl font-bold ">{movie.title}</h2>
              <div className="max-w-md mx-auto">
                <p className="text-justify">{movie.overview}</p>
              </div>
              <p className="mt-1">
                Rating: {renderStarRating(movie.vote_average)}
              </p>
            </div>
          </div>
        )}
        {noResults && <p className="text-lg">No results found.</p>}
      </div>
    </div>
  );
}

export default Movie;
