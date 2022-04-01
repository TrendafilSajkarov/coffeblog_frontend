import Head from "next/head";
import "tailwindcss/tailwind.css";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-MNR26RX" });
  }, []);
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link rel="preconnect" href="https://static.doubleclick.net"></link>
        <link
          rel="preconnect"
          href="https://googleads.g.doubleclick.net"
        ></link>
        <link rel="preconnect" href="https://www.google.com"></link>
        <link rel="preconnect" href="https://yt3.ggpht.com"></link>
        <link rel="preconnect" href="https://jnn-pa.googleapis.com"></link>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
