import { NextPage } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api, { Customer, Item } from "~/api";
import ProductCard from "~/components/ProductCard";

const Slug: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

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
        .then((res) => setItems(res))
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
      <main className="p-2">
        <h1>{slug}</h1>
        <section className="grid grid-cols-auto-fit justify-items-center gap-6 ">
          {items?.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Slug;
