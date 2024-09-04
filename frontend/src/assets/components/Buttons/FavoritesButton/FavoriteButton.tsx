import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { addFavorite, removeFavorite, getFavorites } from '../../../api/api.ts';
import { Movie } from '../../../Types/Movie.ts';
import './FavoriteButton.scss';

interface FavoriteButtonProps {
    movie: Movie;
}

export default function FavoriteButton({movie}: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {

                const favorites = await getFavorites();
                const isFav = favorites.some((fav: Movie) => fav.id === movie.id);

                setIsFavorite(isFav);
            } catch (error) {
                console.error("Erro ao verificar favoritos", error);
            }
        };
        checkIfFavorite();
    }, [movie.id]);

    const handleFavoriteClick = async () => {
        if (isFavorite) {
            // Mostrar a mensagem de confirmação
            if (window.confirm("Tem certeza que deseja remover dos favoritos?")) {
                console.log(movie.id);
                try {
                    await removeFavorite(movie.id);
                    setIsFavorite(false);
                    window.location.reload();
                } catch (error) {
                    console.error("Erro ao remover dos favoritos", error);
                }
            }
        } else {
            try {
                await addFavorite(movie);
                setIsFavorite(true);
            } catch (error) {
                console.error("Erro ao adicionar aos favoritos", error);
            }
        }
    };

    return (
        <div className='favorite-icon' onClick={handleFavoriteClick}>
            {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
        </div>
    );
}