// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

function loadCartItemsFromStorage() {
    try {
        const raw = localStorage.getItem("cartItems");
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

const initialState = {
    cartItems: loadCartItemsFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((p) => p.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.cartItems.push({ ...action.payload, quantity: action.payload.quantity });
            }
        },
        increaseQty: (state, action) => {
            const item = state.cartItems.find((p) => p.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQty: (state, action) => {
            const item = state.cartItems.find((p) => p.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((p) => p.id !== action.payload);
        },
    },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
