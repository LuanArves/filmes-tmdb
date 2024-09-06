import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from '../MovieCard/MovieCard.tsx'
import ReactLoading from "react-loading";
import Navbar from "../navbar/Navbar.tsx";
import './Search.scss'

export default function Search() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const query = searchParams.get("q");

    const searchURL = "https://api.themoviedb.org/3/search/movie";
    const apiKey = '023f50eadcc5fd4817f2aef593206032'

    const getSearchedMovies = async () => {
        const url = `${searchURL}?api_key=${apiKey}&query=${query}`;
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
        setIsLoading(false);
    };

    useEffect(() => {
        getSearchedMovies();
    }, [query]);

    if (isLoading){
        return (
            <div className="loading">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        )
    }
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <h2 className="title-result">
                    Resultados para <span className="query-text">{query ? query : "nada a encontrar"}</span>
                </h2>
                <div className="movies-container">
                    {movies.length > 0 &&
                        movies.map((movie) =>
                            <MovieCard
                                movie={movie}/>)}
                </div>
            </div>
        </div>
    );
}
