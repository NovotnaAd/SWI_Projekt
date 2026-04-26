import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/products" element={<Products />} />

                <Route path="/category/:slug" element={<CategoryPage />} />

                <Route path="/product/:slug" element={<ProductDetail />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/login" element={<Login />} />

                <Route path="/wishlist" element={<Wishlist />} />

                <Route path="/register" element={<Register />} />

                <Route path="/profile" element={<ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;