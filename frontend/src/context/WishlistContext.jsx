import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            setWishlist(JSON.parse(saved));
        }
    }, []);

    const toggleWishlist = (product) => {
        const exists = wishlist.find((p) => p.id === product.id);

        let updated;

        if (exists) {
            updated = wishlist.filter((p) => p.id !== product.id);
        } else {
            updated = [...wishlist, product];
        }

        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistProvider;