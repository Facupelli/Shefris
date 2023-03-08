import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import api from "~/api";
import type { Item } from "~/api";

import Cart from "~/components/Cart";
import NavBar from "~/components/NavBar";
import ProductCard from "~/components/ProductCard";

const Home: NextPage = () => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    api.items
      .fetch(process.env.NEXT_PUBLIC_DOC_URL!)
      .then((items) => {
        const newItems = items.map((item) => ({
          ...item,
          quantity: 1,
          varieties: item.varieties.split(","),
          varieties2: item.varieties2.split(","),
        }));
        setItems(newItems);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Head>
        <title>Shefris | Pizza Napoletana</title>
        <meta name="description" content="Shefris Napoletano" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar slug="shefris" />

      <Cart />

      <main className="bg-white pt-[calc(70px_+_40px)] pb-10">
        <section className="grid grid-cols-auto-fit justify-items-center gap-y-10 ">
          {items?.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
