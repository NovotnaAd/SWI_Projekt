import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "./ProductDetail.css";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
    const { slug } = useParams();

    const product = products.find(p => p.slug === slug);

    const [selectedSize, setSelectedSize] = useState(null);

    const [selectedVolume, setSelectedVolume] = useState(null);

    const { addToCart } = useContext(CartContext);

    if (!product) {
        return <h2 className="not-found">Produkt nenalezen</h2>;
    }

    return (
        <div className="product-page">

            <div className="product-container">

                {/* LEFT - IMAGE */}
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>

                {/* RIGHT - INFO */}
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>

                    <p className="product-price">{product.price} Kč</p>

                    <p className="product-desc">
                        {product.description || "Popis produktu zatím není k dispozici."}
                    </p>

                    {/* ===== SIZES ===== */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="sizes">
                            <p className="sizes-label">Velikost:</p>

                            <div className="sizes-list">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? "active" : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.volume && product.volume.length > 0 && (
                        <div className="sizes">
                            <p className="sizes-label">Objem (ml):</p>

                            <div className="sizes-list">
                                {product.volume.map(v => (
                                    <button
                                        key={v}
                                        className={`size-btn ${selectedVolume === v ? "active" : ""}`}
                                        onClick={() => setSelectedVolume(v)}
                                    >
                                        {v} ml
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BUTTON */}
                    <button
                        className="btn-add"
                        disabled={
                            (product.sizes && !selectedSize) ||
                            (product.volume && !selectedVolume)
                        }
                        onClick={() => addToCart(product, selectedSize, selectedVolume)}
                    >
                        Přidat do košíku
                    </button>
                </div>

            </div>

        </div>
    );
}

export default ProductDetail;