import { Movie } from "../../Types/Movie.ts";
import StarRating from "../StarRating/StarRating.tsx";
import './MovieCard.scss';
import DetailButton from "../Buttons/Details/Details.tsx";
import FavoriteButton from '../Buttons/FavoritesButton/FavoriteButton.tsx'

export interface Props {
    movie: Movie;
}

export default function MovieCard({ movie }: Props) {
    return (
        <li className='movie-card'>
            <FavoriteButton movie={movie}/>
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
                    : <p>Ainda sem avaliações</p>
                }

                <div className='hidden-content'>
                    {movie.overview &&
                        <p className="movie-info">
                            {movie.overview.length > 100
                                ? `${movie.overview.substring(0, 100)}...`
                                : movie.overview}
                        </p>
                    }
                    <DetailButton movieId={movie.id} />
                </div>
            </div>
        </li>
    );
}
