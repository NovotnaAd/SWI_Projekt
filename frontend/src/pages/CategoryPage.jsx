import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import "./CategoryPage.css";
import { Link } from "react-router-dom";

function CategoryPage() {
    const { slug, gender } = useParams();

    const category = categories.find(
        c => c.slug === slug && c.gender === gender
    );

    const filteredProducts = products.filter(
        p => p.category === slug && p.gender === gender
    );

    return (
        <div className="container mt-5">

            <h1 className="mb-4 text-center">
                {category ? category.name : "Kategorie"}
            </h1>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col">
                        <Link
                            to={`/product/${product.slug}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="card product-card">
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

        </div>
    );
}

export default CategoryPage;