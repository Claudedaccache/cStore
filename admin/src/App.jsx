import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./containers/Layout";
import Orders from "./pages/Orders";
import AddItem from "./pages/AddItem";
import ItemsList from "./pages/ItemsList";
import LoginContent from "./components/login/Login";
import { useState } from "react";
import { useEffect } from "react";

export const backend_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Layout /> : <LoginContent setToken={setToken} />,
      errorElement: <ErrorPage />,
      children: token
        ? [
            {
              index: true,
              element: <Home token={token} setToken={setToken} />,
            },
            { path: "/addItem", element: <AddItem /> },
            { path: "/itemsList", element: <ItemsList /> },
            { path: "/orders", element: <Orders /> },
          ]
        : [],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
