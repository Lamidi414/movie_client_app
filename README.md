# 🎬 Movie Recommendation App

A full-stack Movie Recommendation platform where users can discover, search, and save their favorite movies — powered by the TMDB API.

> ✅ Built with **React**, **Express.js**, **MongoDB**, **JWT Authentication**, and deployed via **Netlify** and **Render**.

---

## 📌 Features

### 🔐 Authentication
- User registration & login with secure JWT tokens
- Passwords hashed using bcrypt
- Auth-protected routes (e.g., favorites, reviews)

### 🔍 Movie Discovery
- Search movies by title (via TMDB)
- View detailed movie information: poster, release date, genres, ratings, etc.
- Personalized movie recommendations using TMDB’s `/recommendations` endpoint

### ⭐ User Features
- Save favorite movies to a personal watchlist
- Create and view movie reviews with ratings
- Responsive layout for both desktop and mobile
- Automatic login session persistence using token storage

---

## 🛠️ Tech Stack

| Frontend      | Backend       | Database  | External API |
|---------------|---------------|-----------|--------------|
| React         | Express.js     | MongoDB   | TMDB API     |
| Axios         | Node.js        | Mongoose  |              |
| React Router  | JWT Auth       |           |              |

---

## 🌐 Live Demo

- 🔗 Frontend: [Deploy with Netlify](link_is_loading...)
- 🔗 Backend API: [Deployed on render](https://movie-api-server.onrender.com/)


## ⚙️ Installation (Local Setup)

### 1. Clone Repositories

```bash
git clone https://github.com/Lamidi414/movie_client_app.git
git clone https://github.com/Lamidi414/movie_server_app.git
```

---

### 2. Backend Setup

```bash
cd movie_server_app
npm install
```

#### 👉 Create a `.env` file with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

Then:

```bash
npm start
```

> The backend will run on: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd movie_client
npm install
```

#### 👉 Create a `.env` file:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

Then:

```bash
npm start
```

> The frontend will run on: `http://localhost:3000`

---

## 📁 Project Structure

### 🔹 Frontend (React)
```
src/
├── components/
│   ├── Navbar.js
│   ├── MovieCard.js
│   └── ...
├── pages/
│   ├── Login.js
│   ├── Register.js
│   ├── Search.js
│   ├── Favorites.js
│   └── MovieDetail.js
├── App.js
└── index.js
```

### 🔹 Backend (Express)
```
server.js
routes/
├── auth.js
├── movies.js
└── reviews.js
models/
├── User.js
├── Review.js
└── Favorite.js
middleware/
├── authMiddleware.js
```

---

## ✅ Upcoming Improvements (Optional)

- [ ] Edit & delete reviews
- [ ] User profile page with saved movies
- [ ] Star rating UI
- [ ] Dark mode toggle
- [ ] Mobile-first redesign
- [ ] Pagination & infinite scroll

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

This project is licensed under the MIT License.  
Feel free to fork and use it in your own portfolio!

---

## 🙋 Author

Built with ❤️ by *Abdulhamid*  
[GitHub Project](https://github.com/Lamidi414)
