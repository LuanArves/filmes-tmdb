import { useState, useEffect } from "react";
import { getFavorites } from "../../api/api.ts";
import MovieCard from '../../components/MovieCard/MovieCard.tsx';
import './FavoritePage.scss';
import Navbar from "../../components/navbar/Navbar.tsx";
import ReactLoading from "react-loading";
import ShareModal from "../../components/Share/Share";
import { Movie } from "../../Types/Movie";

const urlBackend = 'http://localhost:3000';

export default function FavoritesPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shareLink, setShareLink] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesData: Movie[] = await getFavorites();
                console.log(favoritesData);
                setFavorites(favoritesData);
            } catch (error) {
                console.error("Erro ao carregar favoritos", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleShare = async (listName: string): Promise<string> => {
        try {
            const response = await fetch(`${urlBackend}/api/favorites/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ listName, movie: favorites.map(f => f.movie_id) }),
            });
            const data: { link: string, shareCode: string } = await response.json();
            setShareLink(data.link);
            return data.link;
        } catch (error) {
            console.error('Erro ao compartilhar a lista:', error);
            return '';
        }
    };

    if (isLoading) {
        return (
            <div className="loading">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        );
    }
    return (
        <div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="favorites-page">
                <h2 className='my-favorites-title'>Meus favoritos</h2>

                <div className="modal-container">
                    {!isModalOpen && (
                        <button className='share-button' onClick={() => setIsModalOpen(true)}>Compartilhar lista</button>
                    )}

                    {isModalOpen && (
                        <ShareModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onShare={handleShare}
                            shareLink={shareLink}
                        />
                    )}

                    {shareLink && (
                        <div>
                            <a
                                className="share-link-button"
                                href={shareLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Abrir link gerado
                            </a>
                        </div>
                    )}
                </div>

                <div className="movies-container">
                    {favorites.length > 0 ? (
                        favorites.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                            />
                        ))
                    ) : (
                        <div className="empty-text">
                            <p>Você ainda não tem nenhum filme favorito :)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}