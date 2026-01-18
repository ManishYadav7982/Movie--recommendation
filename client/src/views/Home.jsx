import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import SearchSection from "../components/SearchSection";
import Header from "../components/Header";


export default function Home({ searchData, setSearchData, allMovies }) {
  const [movieInput, setMovieInput] = useState(searchData.lastQuery || "");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const getRecommendations = async (title = movieInput) => {
    const query = title.trim();
    if (!query) return;

    setLoading(true);
    setShowDropdown(false);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/recommend`,
        { movie: query }
      );

      setSearchData({
        results: res.data,
        lastQuery: query,
        hasSearched: true
      });
    } catch (err) {
      console.error("Recommendation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = allMovies
    .filter(m => m.toLowerCase().includes(movieInput.toLowerCase()))
    .slice(0, 10);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center bg-black"
      style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover" }}
    >
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-6xl px-6 py-24 space-y-12">

        <Header/>
        <SearchSection
          movieInput={movieInput}
          setMovieInput={setMovieInput}
          getRecommendations={getRecommendations}
          loading={loading}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          filteredMovies={filteredMovies}
        />

        {/*  Results */}
        {searchData.hasSearched && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-slide-in">
            {searchData.results.map((rec) => (
              <MovieCard key={rec.id} movie={rec} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
