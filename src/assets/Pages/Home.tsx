import Navbar from '../components/navbar/Navbar.tsx'
import MovieList from "../components/MovieList/movieList.tsx";


export default function Home() {

    return (
        <div className="App">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="movies-content">
                <MovieList/>
            </div>
        </div>

    )
}