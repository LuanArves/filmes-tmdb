import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/assets/Pages/Home.tsx";
import MovieDetails from "../src/assets/Pages/MovieDetail/MovieDetail.tsx";
import MovieList from "../src/assets/components/MovieList/movieList.tsx";
import Search from "./assets/components/Search/Search.tsx";

import FavoritesPage from "./assets/Pages/FavoritePage/FavoritePage.tsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="/movies" element={<MovieList />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/FavoritePage" element={<FavoritesPage/>} />
            </Routes>
        </Router>
    );
}