import { useState } from "react";
import {
    FaBars,
    FaSearch,
    FaHeart,
    FaUser,
    FaShoppingBag,
    FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import "./Navbar.css";

function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen((prev) => !prev);
        setShowSearch(false);
    };

    const handleSearch = () => {
        setShowSearch((prev) => !prev);
        setMenuOpen(false);
    };

    // 👉 rozdělení kategorií
    const womenCategories = categories.filter(c => c.gender === "women");
    const menCategories = categories.filter(c => c.gender === "men");

    const { cart } = useContext(CartContext);

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-left">
                        <FaBars className="icon" onClick={handleMenu} />
                        <FaSearch className="icon" onClick={handleSearch} />
                    </div>

                    <div className="nav-center">
                        <Link to="/" className="logo-link">
                            <h2 className="logo">Boujee</h2>
                        </Link>
                    </div>

                    <div className="nav-right">
                        <FaPhone className="icon" />
                        <FaHeart className="icon" />
                        <FaUser className="icon" />

                        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="cart-icon">
                                <FaShoppingBag className="icon" />

                                {cart.length > 0 && (
                                    <span className="cart-count">
                    {cart.length}
                </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
            {menuOpen && (
                <div
                    className="overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}
            {/* DROPDOWN MENU */}
            <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
                <div className="dropdown-inner">

                    {/* 👩 HER */}
                    <div className="menu-column">
                        <h4>for HER</h4>
                        {womenCategories.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/women/category/${cat.slug}`}
                                className="menu-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                    {/* 👨 HIM */}
                    <div className="menu-column">
                        <h4>for HIM</h4>
                        {menCategories.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/men/category/${cat.slug}`}
                                className="menu-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                </div>
            </div>

            {/* SEARCH PANEL */}
            <div className={`search-panel ${showSearch ? "active" : ""}`}>
                <input
                    type="text"
                    placeholder="Hledat produkty..."
                    className="search-big"
                />

                <div className="search-results">
                    <div className="product">Produkt 1</div>
                    <div className="product">Produkt 2</div>
                    <div className="product">Produkt 3</div>
                </div>
            </div>
        </>
    );
}

export default Navbar;