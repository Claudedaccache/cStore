/* eslint-disable react/prop-types */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./container/Layout";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import LogIn from "./pages/LogIn";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { ShopContextProvider } from "./context/shopContext";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const backend_url = import.meta.env.VITE_BACKEND_URL;

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/logIn" />;
  }
  return children;
};

const App = () => {
  const storedToken = localStorage.getItem("token");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "/collection", element: <Collection /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/products/:id", element: <Product /> },
        { path: "/logIn", element: <LogIn /> },
        { path: "/verify", element: <Verify /> },
        { path: "/register", element: <Register /> },
        {
          path: "/orders",
          element: (
            <ProtectedRoute token={storedToken}>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/place-order",
          element: (
            <ProtectedRoute token={storedToken}>
              <PlaceOrder />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute token={storedToken}>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <ShopContextProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </ShopContextProvider>
    </>
  );
};

export default App;
