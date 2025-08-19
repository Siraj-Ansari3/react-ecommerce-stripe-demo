import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add item (if already exists, increase quantity)
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    // Remove item completely
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    // Update quantity (if quantity is 0, remove item)
    const updateQuantity = (id, quantity) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Helper functions
    const getCartCount = () =>
        cart.reduce((total, item) => total + item.quantity, 0);

    const getCartTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartCount,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
