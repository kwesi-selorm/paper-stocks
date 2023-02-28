import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/index.css"
import { DevSupport } from "@react-buddy/ide-toolbox"
import { ComponentPreviews, useInitial } from "./dev"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/home-page"
import SignInPage from "./pages/signin-page"
import { QueryClient, QueryClientProvider } from "react-query"
import AssetsPage from "./pages/assets-page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signin",
    element: <SignInPage />
  },
  {
    path: "/assets/:userId",
    element: <AssetsPage />
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <App />
      </DevSupport>
    </QueryClientProvider>
  </React.StrictMode>
)
