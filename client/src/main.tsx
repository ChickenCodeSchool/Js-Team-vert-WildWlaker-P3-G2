// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

/* ********************************************************************** */

// Import the main app component
import App from "./App";
import AdminLayout from "./pages/admin/adminLayout/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import BarberProfil from "./pages/barber/barberProfil/BarberProfil";
import CustomerLayout from "./pages/customer/customerLayout/CustomerLayout";
import Home from "./pages/customer/home/Home";
import SearchPage from "./pages/customer/search/SearchPage";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    id: "app",
    children: [
      {
        path: "/",
        element: <CustomerLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "search", element: <SearchPage /> },
        ],
      },

      {
        path: "/admin",
        element: <AdminLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
      { path: "/barber", element: <BarberProfil /> },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
