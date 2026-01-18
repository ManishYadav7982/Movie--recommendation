import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ArrowLeft, Star, Clock, DollarSign,
    Calendar, TrendingUp, Loader2, Users,
    Clapperboard, Play, Youtube
} from "lucide-react";



export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Ensure the URL matches your backend environment (5000 or 5001)
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/movie/${id}`)
            .then((res) => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));

    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
        </div>
    );

    if (!movie) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold">
            Movie not found.
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 pb-20">

            {/* 1. Hero / Header Section */}
            <div className="relative h-[45vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
                <div className="absolute inset-0 bg-yellow-500/5 backdrop-blur-3xl" />
                <button
                    onClick={() => navigate(-1)}
                    className="relative z-20 m-8 flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-yellow-500 hover:text-black transition-all font-bold group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Results
                </button>
            </div>

            <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-32">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* 2. Main Content Area */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Title & Metadata */}
                        <section className="space-y-6">
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-lg font-bold">
                                <span className="flex items-center gap-2 text-yellow-400">
                                    <Star className="fill-yellow-400" size={20} /> {movie.vote_average}/10
                                </span>
                                <span className="flex items-center gap-2 text-slate-400">
                                    <Clock size={20} /> {movie.runtime} min
                                </span>
                                <span className="flex items-center gap-2 text-slate-400">
                                    <Calendar size={20} /> {movie.release_date}
                                </span>
                            </div>

                            <p className="text-xl text-slate-300 leading-relaxed italic opacity-90 border-l-4 border-yellow-500 pl-6">
                                "{movie.overview}"
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {movie.genres?.map((genre) => (
                                    <span key={genre} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black text-yellow-500 uppercase tracking-widest">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Watch & Trailer Actions */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                            <button
                                onClick={() => window.open(`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`, '_blank')}
                                className="flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black hover:bg-yellow-500 transition-all hover:scale-105 active:scale-95"
                            >
                                <Play size={22} fill="black" /> Watch on Netflix
                            </button>

                            <button
                                onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " official trailer")}`, '_blank')}
                                className="flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl font-black text-white hover:bg-white/10 transition-all active:scale-95"
                            >
                                <Youtube size={22} className="text-red-600" /> Watch Trailer
                            </button>
                        </div>

                        {/* Cast & Crew Section */}
                        <section className="space-y-8 pt-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Users className="text-yellow-500" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter">Cast & Crew</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Crew List */}
                                <div className="space-y-4">
                                    <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                        <Clapperboard size={14} /> Production
                                    </h3>
                                    <div className="space-y-2">
                                        {movie.crew && movie.crew.length > 0 ? (
                                            movie.crew.slice(0, 5).map((name, i) => (
                                                <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                                                    <span className="font-bold text-white">{name}</span>
                                                    <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md font-black uppercase tracking-tighter">Crew</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-slate-600 italic text-sm">Crew information unavailable</p>
                                        )}
                                    </div>
                                </div>

                                {/* Cast List */}
                                <div className="space-y-4">
                                    <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                        <Users size={14} /> Top Cast
                                    </h3>
                                    <div className="space-y-2">
                                        {movie.cast && movie.cast.length > 0 ? (
                                            movie.cast.slice(0, 5).map((name, i) => (
                                                <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                                                    <span className="font-bold text-white">{name}</span>
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Actor</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-slate-600 italic text-sm">Cast information unavailable</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* 3. Financials Sidebar */}
                    <aside className="space-y-6">
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 space-y-10 shadow-2xl sticky top-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter border-b border-white/10 pb-6 text-white/90">
                                Financials
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="p-4 bg-yellow-500/10 rounded-3xl"><DollarSign className="text-yellow-500" size={24} /></div>
                                    <div>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Budget</p>
                                        <p className="text-3xl font-mono font-bold text-white tracking-tighter">
                                            {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="p-4 bg-green-500/10 rounded-3xl"><TrendingUp className="text-green-400" size={24} /></div>
                                    <div>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Revenue</p>
                                        <p className="text-3xl font-mono font-bold text-green-400 tracking-tighter">
                                            {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Data Summary */}
                            <div className="pt-8 mt-8 border-t border-white/5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Status</span>
                                    <span className="text-white font-bold">Released</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">ID Reference</span>
                                    <span className="text-white font-mono opacity-50">#{id}</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}