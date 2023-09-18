import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/layout/RootLayout";
import HomePage from "./pages/HomePage";
import PredictionPage from "./pages/PredictionPage";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "prediction",
        element: <PredictionPage />
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
