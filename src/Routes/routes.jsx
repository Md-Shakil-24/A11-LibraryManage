

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import AuthLayout from "../mainLayout/AuthLayout";
import ErrorPage from "../pages/ErrorPage";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgetPassword from "../pages/ForgatePassward";
import MyProfile from "../pages/MyProfil";

import Home from "../pages/Home";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBook";

import CategoryBooks from "../component/CategoryBooks";
import MyBorrowedBooks from "../pages/MyBorrowedBooks";
import BookDetails from "../pages/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "forgate",
        element: <ForgetPassword />,
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    {
        path: "borrowed",
        element: (
          <PrivateRoute>
            <MyBorrowedBooks></MyBorrowedBooks>
          </PrivateRoute>
        ),
      },

      {
        path: "all-books",
        element: (
          <PrivateRoute>
            <AllBooks></AllBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
      {
        path: "category/:category",
        element: (
          <PrivateRoute>
            <CategoryBooks></CategoryBooks>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
