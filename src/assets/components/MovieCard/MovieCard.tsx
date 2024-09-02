import {Movie} from "../../Types/Movie.ts";
import StarRating from "../StarRating/StarRating.tsx";
import './MovieCard.scss';
export interface Props {
    movie : Movie;
}
export default function MovieCard(props: Props){
    const movie = props.movie;
    return (
    <li className='movie-card'>
        <div className='movie-card-poster'>
            <img
                 src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                 alt={movie.title}
            />
        </div>
        <div className='movie-card-infos'>
            <p className='movie-title'>
                {movie.title}
            </p>
            {movie.vote_average > 0
                    ? <StarRating rating={movie.vote_average} />
                    : <p>Pré estreia</p>
            }

            <div className='hidden-content'>
                {movie.overview &&
                    <p className="movie-info">
                        {movie.overview.length > 100
                            ? `${movie.overview.substring(0, 100)}...`
                            : movie.overview}
                    </p>
                }
                <button className="btn-details">
                    Ver detalhes
                </button>
            </div>
        </div>
    </li>
    )
}