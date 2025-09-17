import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./slices/cartSlice";

const products = [
    { id: 1, name: "Shoe", price: 100 },
    { id: 2, name: "T-Shirt", price: 200 },
    { id: 3, name: "Watch", price: 300 },
];

const Home = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + value, 1),
        }));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: quantities[product.id] || 1 }));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-2xl shadow-lg p-5 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 bg-white"
                >
                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-xl">
                        {product.name}
                    </div>

                    <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">₹{product.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-bold transition-colors"
                        >
                            -
                        </button>
                        <span className="text-lg font-medium">{quantities[product.id] || 1}</span>
                        <button
                            onClick={() => handleQuantityChange(product.id, +1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-bold transition-colors"
                        >
                            +
                        </button>
                    </div>

                    {cartItems.some((item) => item.id === product.id) ? (
                        <button
                            onClick={() => handleRemoveFromCart(product.id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition-colors"
                        >
                            Remove from Cart
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition-colors"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Home;
