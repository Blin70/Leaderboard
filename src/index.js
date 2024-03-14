import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './css/index.css';
import ProfilePage from "./Pages/ProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFoundPage/>
    },
    {
        path: '/Profile',
        element: <ProfilePage/>
    }
]);

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
    <RouterProvider router={router}/>
);