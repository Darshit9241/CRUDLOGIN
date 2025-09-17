import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        employees: employeeReducer,
    },
});
