import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import './MovieDetail.scss';
import { Movie } from "../../Types/Movie.ts";
import Navbar from "../../components/navbar/Navbar.tsx";
import StarRating from "../../components/StarRating/StarRating.tsx";

const apiKey = import.meta.env.VITE_API_KEY;


export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [director, setDirector] = useState<string>("");
    const [actors, setActors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieRes = await axios({
                    method: 'get',
                    url: `https://api.themoviedb.org/3/movie/${id}`,
                    params: {
                        api_key: `${apiKey}`,
                        language: 'pt-BR'
                    }
                });
                setMovie(movieRes.data);


                const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
                const creditsData = await creditsRes.json();
                const directorData = creditsData.crew.find(({ job }: { job: string }) => job === 'Director');
                setDirector(directorData ? directorData.name : "Unknown");
                setActors(creditsData.cast);

                const videosRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
                const videosData = await videosRes.json();
                const trailer = videosData.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
                setTrailerKey(trailer ? trailer.key : null);

                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="loading">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        );
    }

    if (!movie) return <div>No movie found!</div>;

    return (
        <div className="movie-detail-page">
            <div>
                <Navbar/>
            </div>
            <div className="movie-detail-container">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
                </div>
                <div className="movie-info-section">
                    <h2 className="movie-title">{movie.title}</h2>
                    <p>{movie.tagline}</p>
                    <h1 className='movie-sinopse'>Sinopse</h1>
                    <p>{movie.overview}</p>
                    <h1 className='movie-rating'>Avaliações</h1>
                    <p>
                        <StarRating rating={movie.vote_average}/>
                    </p>
                    <h1 className='movie-runtime'>Duração</h1>
                    <p>{movie.runtime} minutos</p>
                    <h1 className="movie-release">Release Date</h1>
                    <p>{movie.release_date}</p>
                    <h1 className="movie-director">Diretor</h1>
                    <p>{director}</p>
                </div>
            </div>
            {trailerKey ? (
                <div className="movie-trailer-section">
                    <h3>Trailer</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="Trailer do filme"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <p>Trailer não disponível.</p>
            )}
            <h3>Elenco principal</h3>
            <div className="movie-cast-section">
                <div className="cast-list">
                    {actors.slice(0, 5).map((actor) => (
                        <div key={actor.id} className="actor-item">
                            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name}/>
                            <p>{actor.name}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
