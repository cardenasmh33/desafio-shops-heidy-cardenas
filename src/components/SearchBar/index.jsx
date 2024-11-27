import React, { useState } from "react";
import { useNavigate } from 'react-router';

import logo from '../../assets/images/logo_large_25years@2x.png';
import iconSearch from '../../assets/images/ic_Search@2x.png.png';
import './styles.scss'

function SearchBar(props) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        navigate(`/items?search=${query.replaceAll(" ", "-")}`);
    }

    return (
        <div className="search-bar">
            <div className="search-bar-container">
                <img className="bar-icon" src={logo} alt="Logo Mercado Libre" onClick={() => {
                    navigate('/');
                    setQuery('');
                }} />
                <form className="search-box" onSubmit={handleSubmit}>
                    <input
                        className="search-box-input"
                        placeholder="Buscar productos, marcas y más…"
                        onChange={handleInputChange}
                        value={query}
                    />
                    <button className="search-box-button" type="submit">
                        <img src={iconSearch} alt="Ícono de búsqueda" className="search-icon" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;