import React, { useState, useEffect, useContext } from 'react';
import { API_BASE_URL } from '../apiConfig';
import { CartContext } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        setLoading(true);
        const url = searchQuery
            ? `${API_BASE_URL}/products/search?query=${searchQuery}`
            : `${API_BASE_URL}/products`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Chyba při načítání produktů:', error);
                setLoading(false);
            });
    }, [searchQuery]);

    if (loading) return <div className="loading">Načítám luxusní kousky...</div>;

    return (
        <div className="container mt-5 products-page">

            <h1 className="mb-4 text-center products-title">
                {searchQuery ? `Výsledky pro: "${searchQuery}"` : "Naše nabídka"}
            </h1>

            {products.length === 0 && (
                <p className="text-center mt-5" style={{ color: "#999" }}>
                    Žádné produkty nenalezeny
                </p>
            )}

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div key={product.id} className="col">
                        <div
                            className="card product-card"
                            onClick={() => navigate(`/product/${product.slug}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.nazev}
                                className="product-img"
                            />
                            <div className="card-body text-center">
                                <h5>{product.nazev}</h5>
                                <p className="price">{product.cena.toLocaleString()} Kč</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Products;