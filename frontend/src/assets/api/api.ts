import axios from 'axios';
import { Movie } from '../Types/Movie.ts';


const API_URL = `http://localhost:3000/api`;
export const addFavorite = async (movie: Movie) => {
    try {
        const movieData = {
            movie_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
        };
        const res = await axios.post(`${API_URL}/favorites`, movieData);
        return res.data;
    } catch (error) {
        console.error("Erro ao adicionar aos favoritos", error);
        throw error;
    }
};

export const removeFavorite = async (movieId: number) => {
    try {
        await axios.delete(`${API_URL}/favorites/${movieId}`);
    } catch (error) {
        console.error("Erro ao remover dos favoritos", error);
        throw error;
    }
};

export interface FavoriteMovie extends Movie {
    movie_id: number;
}

export const getFavorites = async (): Promise<FavoriteMovie[]> => {
    try {
        const res = await axios.get(`${API_URL}/favorites`);
        return res.data;
    } catch (error) {
        console.error("Erro ao obter favoritos", error);
        throw error;
    }
};

export const getSharedList = async (shareCode: string) => {
    try {
        const response = await axios.get(`${API_URL}/favorites/share/${shareCode}`);
        console.log(response);

        if (response.status !== 200) {
            throw new Error('List not found');
        }

        const data = response.data;
        console.log(data);
        console.log("Dados recebidos pela API:", data);
        return data;
    } catch (error) {
        console.error("Erro ao buscar a lista compartilhada:", error);
        throw error;
    }
};