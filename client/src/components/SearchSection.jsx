import React from "react";
import { Search, Sparkles, ChevronDown, Loader2, Film } from "lucide-react";

export default function SearchSection({ 
  movieInput, 
  setMovieInput, 
  getRecommendations, 
  loading, 
  showDropdown, 
  setShowDropdown, 
  filteredMovies 
}) {
  return (
    <section className="relative w-full max-w-3xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getRecommendations();
        }}
        className="relative z-[100]"
      >
        {/* Main Search Bar */}
        <div className={`flex gap-3 p-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 transition-all duration-300 ${showDropdown ? 'rounded-t-2xl shadow-none' : 'rounded-2xl shadow-2xl shadow-black/50'}`}>
          
          <div className="flex-1 relative flex items-center h-14 md:h-16">
            <Search className="absolute left-4 text-slate-500 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for a movie..."
              value={movieInput}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setMovieInput(e.target.value);
                setShowDropdown(true);
              }}
              className="w-full pl-12 pr-12 bg-transparent text-white focus:outline-none text-xl font-medium placeholder-slate-600"
            />
            
            {/* The Dropdown Toggle (^) */}
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className={`absolute right-4 text-slate-400 hover:text-yellow-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
            >
              <ChevronDown />
            </button>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!movieInput.trim() || loading}
            className="px-6 md:px-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 whitespace-nowrap"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span className="hidden md:inline">Find Movies</span>
          </button>
        </div>

        {/* The Dropdown List */}
        {showDropdown && (
          <div className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-3xl border border-white/10 border-t-0 rounded-b-2xl max-h-80 overflow-y-auto shadow-2xl z-[110] divide-y divide-white/5 animate-in fade-in slide-in-from-top-2">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((m, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setMovieInput(m);
                    getRecommendations(m);
                  }}
                  className="group flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-yellow-400 transition-all"
                >
                  <Film className="w-5 h-5 text-slate-500 group-hover:text-slate-900" />
                  <span className="text-slate-200 group-hover:text-slate-950 font-bold text-lg">
                    {m}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-6 text-slate-500 text-center font-medium">
                No movies found in database
              </div>
            )}
          </div>
        )}
      </form>

     
      {showDropdown && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </section>
  );
}