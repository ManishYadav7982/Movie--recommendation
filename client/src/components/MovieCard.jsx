import { Film } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const displayTitle = typeof movie === 'string' ? movie : movie.title;
  const movieId = movie.id || movie; 
  return (
    <div
      onClick={() => navigate(`/movie/${movieId}`)}
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-yellow-400 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl"
    >
      <Film className="w-8 h-8 text-yellow-400 mb-4 group-hover:text-black transition-colors" />
      <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors">
        {displayTitle}
      </h3>
      <p className="mt-2 text-slate-500 group-hover:text-slate-800 text-xs font-bold uppercase tracking-tighter">
        View Details
      </p>
    </div>
  );
}