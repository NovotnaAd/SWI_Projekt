import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    if (wishlist.length === 0) {
        return <h2 className="empty">Nemáte žádné oblíbené produkty</h2>;
    }

    return (
        <div className="wishlist-page">

            <h1>Oblíbené</h1>

            <div className="wishlist-grid">
                {wishlist.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className="wishlist-link"
                    >
                        <div className="wishlist-card">

                            {/* REMOVE */}
                            <span
                                className="wishlist-remove"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // 🔥 důležité
                                    toggleWishlist(product);
                                }}
                            >
                                ✕
                            </span>

                            {/* IMAGE + OVERLAY */}
                            <div className="wishlist-image-wrapper">
                                <img src={product.image} alt={product.name} />

                                <div className="wishlist-overlay">
                                    <button
                                        className="wishlist-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                    >
                                        Přidat do košíku
                                    </button>
                                </div>
                            </div>

                            <h5>{product.name}</h5>
                            <p>{product.price} Kč</p>

                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}

export default Wishlist;