import './movieList.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {Movie} from "../../Types/Movie.ts";
import MovieCard from "../MovieCard/MovieCard.tsx";
import ReactLoading from "react-loading";


export default function MovieList() {
    const [movie, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, []);
    const getMovies =  async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params:{
                api_key: '023f50eadcc5fd4817f2aef593206032',
                language: 'pt-BR'
            }
        }).then(res => {
            setMovies(res.data.results); //Retorno dos dados da API
        });
        setIsLoading(false);
    }

    if (isLoading){
        return (
            <div className="loading">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (
        <ul className="movie-list">
            {movie.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}

        </ul>
    );
}