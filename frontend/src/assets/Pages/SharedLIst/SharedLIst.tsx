import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { getSharedList } from '../../api/api';
import { Movie } from "../../Types/Movie";
import MovieCard from '../../components/MovieCard/MovieCard';
import axios from 'axios';
export default function SharedListPage() {
    const { shareCode } = useParams();
    const [listName, setListName] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchList = async () => {
            try {
                if (shareCode) {
                    const response = await getSharedList(shareCode);
                    setListName(response.listName);
                    const movieIds = response.movie; // Obtenha os IDs dos filmes

                    // Agora vamos buscar os detalhes de cada filme
                    const movieDetailsPromises = movieIds.map(async (id: number) => {
                        const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=023f50eadcc5fd4817f2aef593206032`);
                        return movieDetails.data;
                    });

                    const moviesDetails = await Promise.all(movieDetailsPromises);
                    setMovies(moviesDetails);
                } else {
                    console.error("Share code não encontrado na URL.");
                }
            } catch (error) {
                console.error("Erro ao buscar a lista compartilhada:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchList();
    }, [shareCode]);

    if (isLoading) {
        return (
            <div className="loading">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        );
    }

    if (!movies.length) {
        return <div className="list-not-found">List not found!</div>;
    }

    return (
        <div>
            <h2>Shared List: {listName}</h2>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
        </div>
    );
}
