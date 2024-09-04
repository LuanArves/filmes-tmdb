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
        <nav className="navbar">
            <h2 className="page-title">
                <Link to="/">
                    Filmes
                </Link>
            </h2>
            <p className="favorite-button-list">
                <Link to={`/FavoritePage`}>
                    Lista de favoritos
                </Link>
            </p>
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
        </nav>
    );
}
