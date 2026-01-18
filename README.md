🎬 MovieFinder - AI-Powered Discovery
MovieFinder is a high-performance, full-stack movie recommendation platform that uses Machine Learning to provide personalized cinematic suggestions. Designed with a premium "Glassmorphism" aesthetic, it offers a seamless experience for searching, exploring metadata, and watching trailers.

🌟 Live Demo
Frontend: https://your-app-name.netlify.app

API Backend: https://your-api-name.onrender.com

✨ Core Features
AI Recommendation Engine: Uses content-based filtering to suggest movies similar to your favorites.

Intelligent Search: Real-time filtering with a persistent dropdown toggle for quick database access.

Deep Metadata: View comprehensive movie details including Budget, Revenue, Runtime, and Vote Average.

Cast & Crew: Detailed production and acting credits for over 5,000 films.

In-App Trailer Modal: Watch official YouTube trailers (Rotten Tomatoes Classic) directly in a blur-overlay modal.

Direct "Watch" Integration: One-click deep-linking to search for the title on Netflix.

Persistent Search Results: Intelligent routing that remembers your 5-10 recommended matches even after viewing details and clicking "Back".

🛠️ Tech Stack
Frontend: React.js (Vite), Tailwind CSS, Lucide Icons, React Router DOM.

Backend: Python (Flask), Flask-CORS.

Machine Learning: Pandas, Scikit-Learn (Cosine Similarity).

Deployment: [Frontend: Vercel/Netlify] | [Backend: Render/Heroku/Railway].

⚙️ Deployment Configuration
To run this project in a live environment, the following configurations were implemented:

1. Environment Variables
The frontend uses a .env file to point to the live API instead of localhost:

Plaintext
VITE_API_URL=https://your-api-name.onrender.com
2. CORS Policy
The Flask backend is configured to accept requests only from the deployed frontend domain:

Python
CORS(app, origins=["https://your-app-name.netlify.app"])
3. Production Build
Bash
# Frontend Build
npm run build

# Backend Requirements
pip freeze > requirements.txt
📁 File Structure
Plaintext
src/
├── components/       # Header, SearchSection, MovieCard
├── views/            # Home (Search view), MovieDetails (Data view)
├── App.jsx           # Main Router & Global State Management
└── main.jsx          # Entry point with BrowserRouter
🚀 Local Setup
Clone: git clone https://github.com/yourusername/moviefinder.git

Server: cd server && python app.py

Client: cd client && npm install && npm run dev

👨‍💻 Author
Manish Yadav AI Full Stack Developer