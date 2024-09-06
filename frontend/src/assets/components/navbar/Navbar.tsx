import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import "./Navbar.scss";

export default function Navbar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!search) return;

        navigate(`/search?q=${search}`, { replace: true });
        setSearch("");
    };

    return (
        <div className="navbar-container">
            <h2 className="page-title">

                <Link to="/">
                    Filmes-tmdb
                </Link>
            </h2>
            <h2 className="favorite-button-list">

                <Link to={`/FavoritePage`}>
                    Favoritos
                </Link>
            </h2>
            <form className='search-bar' onSubmit={handleSubmit}>
                <input className='search-bar-input'
                    type="text"
                    placeholder="Busque um filme"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button className="search-button" type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
        </div>
    );
}
