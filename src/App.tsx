import Navbar from "./assets/components/navbar";
import MovieList from "./assets/components/MovieList/movieList.tsx";

function App() {

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

export default App
