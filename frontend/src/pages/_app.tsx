import "@/styles/globals.css"
import type { AppProps } from "next/app"
import React from "react"

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState(null)

  return <Component {...pageProps} user={user} setUser={setUser} />
}
