import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import api from "~/api";
import type { Item } from "~/api";

import Cart from "~/components/Cart";
import NavBar from "~/components/NavBar";
import ProductCard from "~/components/ProductCard";
import { formatPrice } from "~/utils/price";
import ProductButton from "~/components/ProductButton";
import { useCartStore } from "~/zustand/store";

const Home: NextPage = () => {
  const [items, setItems] = useState<Item[]>();
  const [promos, setPromos] = useState<Item[]>();

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    api.items
      .fetch(process.env.NEXT_PUBLIC_DOC_URL!)
      .then((res) => {
        const newItems = res.items.map((item) => ({
          ...item,
          quantity: 1,
          varieties: item.varieties.split(","),
          varieties2: item.varieties2.split(","),
        }));
        setItems(newItems);
        const newPromos = res.promos.map((item) => ({
          ...item,
          quantity: 1,
          varieties: item.varieties.split(","),
          varieties2: item.varieties2.split(","),
        }));
        setPromos(newPromos);
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
        <section className="grid grid-cols-auto-fit justify-items-center gap-y-16 ">
          {items?.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </section>
        <section className="grid grid-cols-auto-fit justify-items-center gap-y-16 pt-24 ">
          <div className="mx-[calc((100%_-_300px)/2)] justify-self-start font-dosis ">
            <h1 className="text-4xl font-bold underline">PROMOS</h1>
          </div>
          {promos?.map((promo, i) => (
            <article className="grid w-card rounded-lg bg-neutral-100 p-6 font-dosis shadow sm:gap-2">
              <p className="text-2xl font-bold">{promo.name}</p>
              <p className="text-right font-lobster text-xl font-semibold">
                {formatPrice(promo.price)}
              </p>
              <ProductButton addItem={() => addItem(promo)} product={promo} />
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
