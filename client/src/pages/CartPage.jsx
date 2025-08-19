import React from "react";
import { useCart } from "../context/cartContext";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    console.log("Cart items:", cart);

    const sendCartToServer = async () => {

        // Prepare the cart data to be sent to the server (price is calculated at the backend for security)
        const secureCart = cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }))

        try {
            const response = await fetch("http://localhost:8000/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: secureCart })
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Server response:", data);
            window.location.href = data.redirectUrl; // Redirect to the confirmation page
        } catch (error) {
            console.error("Error sending cart to server:", error);
        }
        console.log("Secure cart data:", secureCart);
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty </p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between border p-3 rounded"
                            >
                                <span>{item.name}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 bg-gray-300 rounded"
                                    >
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 bg-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-3 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6">
                        <p className="font-semibold">Total: ${getCartTotal()}</p>
                        <button
                            onClick={clearCart}
                            className="mt-3 cursor-pointer bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Clear Cart
                        </button>
                        <button
                            onClick={sendCartToServer}
                            className="ml-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
