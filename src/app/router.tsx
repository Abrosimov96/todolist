import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "app/App"
import { Login } from "features/auth/ui/Login"
import { TodolistList } from "features/TodolistList/ui/TodolistList"
import { ErrorPage } from "common/components/ErrorPage/ErrorPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Navigate to="/404" />,
        children: [
            {
                index: true,
                element: <Navigate to="/todolists" />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/todolists",
                element: <TodolistList />,
            },
        ],
    },
    {
        path: "/404",
        element: <ErrorPage />,
    },
])
