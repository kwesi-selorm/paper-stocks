import "@/styles/globals.css"
import type { AppProps } from "next/app"
import React from "react"
import UserContextProvider from "@/contexts/user-context/UserContextProvider"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import ModalContextProvider from "@/contexts/modal-context/ModalContextProvider"

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
