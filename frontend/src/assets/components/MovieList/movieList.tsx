import './movieList.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../../Types/Movie.ts";
import MovieCard from "../MovieCard/MovieCard.tsx";
import ReactLoading from "react-loading";
import ReactPaginate from 'react-paginate';

const apiKey = import.meta.env.VITE_API_KEY;

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        getMovies(page);
    }, [page]);

    const getMovies = async (currentPage: number) => {
        setIsLoading(true);
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: `${apiKey}`,
                language: 'pt-BR',
                page: currentPage
            }
        }).then(res => {
            setMovies(res.data.results);
            setTotalPages(res.data.total_pages);
        }).catch(error => {
            console.error("Erro ao buscar filmes:", error);
        });
        setIsLoading(false);
    };

    const handlePageClick = (data: { selected: number }) => {
        setPage(data.selected + 1);
        window.scrollTo(0, 0);
    };

    if (isLoading) {
        return (
            <div className="loading">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        );
    }

    return (
        <div className="list-container">
            <div className='title-section-container'>
                <h2 className='title-section'>Destaques</h2>
            </div>
            <div className="movieList">
                <ul className="movie-list">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </ul>
            </div>
            <ReactPaginate
                previousLabel={"← Anterior"}
                nextLabel={"Próximo →"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                forcePage={page - 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                disabledClassName={"disabled"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
            />
        </div>
    );
}
