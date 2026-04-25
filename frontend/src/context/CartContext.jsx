import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, selectedSize, selectedVolume) => {
        const newItem = {
            ...product,
            selectedSize,
            selectedVolume,
            quantity: 1,
        };

        setCart(prev => [...prev, newItem]);
    };

    const increaseQty = (index) => {
        setCart(prev =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (index) => {
        setCart(prev =>
            prev
                .map((item, i) =>
                    i === index
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            increaseQty,
            decreaseQty
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;