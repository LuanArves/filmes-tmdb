import { useState, useEffect } from "react";
import { getFavorites } from "../../api/api.ts";
import MovieCard from '../../components/MovieCard/MovieCard.tsx';
import './FavoritePage.scss';
import Navbar from "../../components/navbar/Navbar.tsx";
import ReactLoading from "react-loading";
import { FavoriteMovie } from '../../api/api.ts';

export default function FavoritesPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesData = await getFavorites();
                setFavorites(favoritesData);
            } catch (error) {
                console.error("Erro ao carregar favoritos", error);
            }
            setIsLoading(false);
        };
        fetchFavorites();

    }, []);
    if (isLoading){
        return (
            <div className="loading">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (
        <div>
        <div className="navbar">
            <Navbar />
        </div>
        <div className="favorites-page">
            <h2>Meus Favoritos</h2>
            <div className="movies-container">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <MovieCard
                            key={movie.movie_id}
                            movie={movie}
                        />
                    ))
                ) : (
                    <div className="empty-text">
                        <p>Você ainda não tem filmes favoritos.</p>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}
