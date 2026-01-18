print(" THIS APP.PY IS RUNNING ")

from flask import Flask, request, jsonify
import pickle
import pandas as pd
import os
from dotenv import load_dotenv

# load env file
load_dotenv()

app = Flask(__name__)

# Load data
movies = pickle.load(open(os.getenv("MOVIE_LIST_PATH"), "rb"))
similarity = pickle.load(open(os.getenv("SIMILARITY_PATH"), "rb"))
movies_info = pickle.load(open(os.getenv("MOVIE_INFO_PATH"), "rb"))
movies_infomation = pickle.load(open(os.getenv("MOVIE_INFORMATION_PATH"), "rb"))


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    movie = data["movie"].strip().lower()

    movies["title_lower"] = movies["title"].str.lower()

    if movie not in movies["title_lower"].values:
        return jsonify([])

    index = movies[movies["title_lower"] == movie].index[0]
    distances = similarity[index]

    movie_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:6]

    recommendations = []
    for i in movie_list:
        movie_data = movies.iloc[i[0]]
        recommendations.append({
            "id": int(movie_data.name),
            "title": movie_data.title
        })
    return jsonify(recommendations)


@app.route("/movies", methods=["GET"])
def get_movies():
    return jsonify(movies["title"].tolist())


@app.route("/movie/<int:id>", methods=["GET"])
def movie_details(id):
    if id not in movies_info.index or id not in movies_infomation.index:
        return jsonify({"error": "Movie not found"}), 404

    # genre from movie_info
    movie_basic = movies_info.loc[id]

    # other details from movie_information
    movie_full = movies_infomation.loc[id]

    return jsonify({
        "id": int(id),
        "title": movie_full["title"],
        "overview": movie_full["overview"],
        "release_date": movie_full["release_date"],
        "runtime": int(movie_full["runtime"]) if pd.notna(movie_full["runtime"]) else None,
        "vote_average": float(movie_full["vote_average"]) if pd.notna(movie_full["vote_average"]) else None,
        "budget": int(movie_full["budget"]) if pd.notna(movie_full["budget"]) else None,
        "revenue": int(movie_full["revenue"]) if pd.notna(movie_full["revenue"]) else None,

        #  genre ONLY from movie_info
        "genres": movie_basic["genres"],
        "cast": movie_basic["cast"],
        "crew": movie_basic["crew"],
    })


# budget , genre form movies , overview , release_date , revenue , runtime , vote_average


if __name__ == "__main__":
    app.run(
        host=os.getenv("ML_HOST", "127.0.0.1"),
        port=int(os.getenv("ML_PORT", 5001)),
        debug=True
    )
