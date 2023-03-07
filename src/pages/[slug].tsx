import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api, { Customer, Item } from "~/api";
import Cart from "~/components/Cart";

import NavBar from "~/components/NavBar";
import ProductCard from "~/components/ProductCard";

const Slug: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const [items, setItems] = useState<Item[]>();
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    api.customers.fetch().then((customers) => {
      const customer = customers.find((c) => c.slug === slug);
      setCustomer(customer);
    });
  }, []);

  useEffect(() => {
    if (customer) {
      api.items
        .fetch(customer.url)
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
    }
  }, [customer]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Shefris Napoletano" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar slug={slug} />

      <Cart />

      <main className="bg-white pt-20 pb-10">
        <section className="grid grid-cols-auto-fit justify-items-center gap-10 ">
          {items?.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Slug;
