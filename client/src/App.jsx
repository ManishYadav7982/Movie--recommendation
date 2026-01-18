import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./views/Home";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [searchData, setSearchData] = useState({
    results: [],
    lastQuery: "",
    hasSearched: false
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/movies`)
      .then(res => setAllMovies(res.data))
      .catch(() => { });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home searchData={searchData} setSearchData={setSearchData} allMovies={allMovies} />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}