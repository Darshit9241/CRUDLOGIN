import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "./slices/cartSlice";

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-2xl shadow-lg p-4 flex flex-col justify-between bg-white"
                            >
                                <h2 className="font-bold text-lg mb-2">{item.name}</h2>
                                <p className="text-gray-600 mb-3">Price: ₹{item.price}</p>
                                <p className="text-gray-600 mb-3">Total: ₹{item.price * item.quantity}</p>

                                <div className="flex items-center gap-3 mb-3">
                                    <button
                                        onClick={() => dispatch(decreaseQty(item.id))}
                                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(increaseQty(item.id))}
                                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-right text-xl font-bold text-gray-800">
                        Total Price: ₹{totalPrice}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
