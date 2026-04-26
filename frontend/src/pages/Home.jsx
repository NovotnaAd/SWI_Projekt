import "./Home.css";
import video from "../assets/images/video.mp4";
import summer from "../assets/images/summer_collection.jpg";

import { categories } from "../data/categories";
import { products } from "../data/products";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";


function Home() {

    const presale = products.filter(p => p.tag === "presale");
    const bestsellers = products.filter(p => p.tag === "bestseller");

    const { wishlist, toggleWishlist } = useContext(WishlistContext);

    return (
        <div className="home">

            {/* HERO */}
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Den Matek</h1>
                    <p>Pro ženu, která si zaslouží to nejlepší</p>
                    <button>Nakupujte nyní</button>
                </div>
            </section>

            {/* KATEGORIE */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Dárky pro ni</h2>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-5">
                    {categories
                        .filter(cat => cat.gender === "women")
                        .map((cat) => (
                            <div className="col" key={cat.id}>
                                <Link
                                    to={`/women/category/${cat.slug}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div className="card category-card-clean">
                                        <img src={cat.image} alt={cat.name} />
                                        <div className="card-body text-center">
                                            <h5>{cat.name}</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </section>

            {/* VIDEO */}
            <section className="video-section">
                <video autoPlay muted loop className="video-bg">
                    <source src={video} type="video/mp4" />
                </video>

                <div className="video-overlay">
                    <h2>Styl, který mluví za vás</h2>
                    <p>Elegance v každém detailu</p>
                    <button>Prohlédnout</button>
                </div>
            </section>

            {/* PRE-SALE PRODUKTY */}
            {/* PRE-SALE PRODUKTY */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Pre-sale produkty</h2>

                <div className="row row-cols-1 row-cols-md-3 g-5">
                    {presale.map((product) => {
                        const isInWishlist = wishlist.some((p) => p.id === product.id);

                        return (
                            <div className="col" key={product.id}>
                                <Link
                                    to={`/product/${product.slug}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div className="card product-card">

                                        {/* WISHLIST */}
                                        <div
                                            className="wishlist-icon"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleWishlist(product);
                                            }}
                                        >
                                            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                                        </div>

                                        <img src={product.image} alt={product.name} />

                                        <div className="card-body text-center">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="price">{product.price} Kč</p>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* BANNER */}
            <section className="quote-banner">
                <p>Elegance je jediná krása, která nikdy nevyjde z módy.</p>
            </section>

            {/* BESTSELLERS */}
            {/* BESTSELLERS */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Nejprodávanější</h2>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {bestsellers.map((product) => (
                        <div className="col" key={product.id}>
                            <Link
                                to={`/product/${product.slug}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div className="card product-card">
                                    <div className="badge">Bestseller</div>
                                    <img src={product.image} alt={product.name} />
                                    <div className="card-body text-center">
                                        <h5>{product.name}</h5>
                                        <p className="price">{product.price} Kč</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* SUMMER HERO */}
            <section
                className="summer-hero"
                style={{ backgroundImage: `url(${summer})` }}
            >
                <div className="summer-overlay">
                    <h2>Objevte naši letní kolekci</h2>
                    <p>Lehkost, barvy a letní elegance</p>
                    <button>Prohlédnout kolekci</button>
                </div>
            </section>

        </div>
    );
}

export default Home;