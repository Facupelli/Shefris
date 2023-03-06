import { type NextPage } from "next";
import Head from "next/head";
import api, { Item } from "../api";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    api.items
      .fetch()
      .then((res) => setItems(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Shefris Napoletano" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <h1>SHEFRIS</h1>
        <ul>
          {items?.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
