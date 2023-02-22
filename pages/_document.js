import {Html, Head, Main, NextScript} from "next/document"
import React from "react"

export default function Document() {
  return (
    <React.StrictMode>
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </React.StrictMode>
  )
}
