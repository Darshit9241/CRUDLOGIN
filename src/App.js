import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Home";
import Cart from "./Cart";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { logout } from "./slices/authSlice";
import Employee from "./Employee";
// import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";

const App = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <span className="font-bold text-lg">🛍 Shop</span>

        <div className="flex gap-4 items-center">
          <Link to="/cart" className="relative">
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>

          <Link to="/employees" className="relative">
            Employees
          </Link>

          {!isAuthenticated ? (
            <>
              <a href="/signup">Signup</a>
              <a href="/login">Login</a>
            </>
          ) : (
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <Routes>
        {/* If not logged in, redirect "/" to login */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/new"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/:id/edit"
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Any unknown route → go to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
