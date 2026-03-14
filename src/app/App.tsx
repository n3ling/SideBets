import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "../styles/App.css";

export function App() {
  return <RouterProvider router={router} />;
}
