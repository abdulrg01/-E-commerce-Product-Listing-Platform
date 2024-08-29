import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="E-commerce Product Listing Platform"
          />
          <meta property="og:title" content="E-commerce Platform" />
          <meta
            property="og:description"
            content="Browse and manage products."
          />
          <meta property="og:type" content="website" />
          <title>E-commerce Platform</title>
        </Head>

        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
