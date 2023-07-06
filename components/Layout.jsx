import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - NFT MARKET" : "NFT MARKET"}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <div className=" top-0 z-40">
          <Navbar />
        </div>
        <main className="">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
