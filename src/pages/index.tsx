import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import api, { Customer } from "~/api";

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>();

  let customer: Customer | undefined;

  useEffect(() => {
    api.customers.fetch().then((customers) => setCustomers(customers));
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Shefris Napoletano" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <h1>Whats Cookin</h1>
        <ul>
          {customers?.map((customer, i) => (
            <li key={i}>
              <Link href={`/${customer.slug}`}>{customer.slug}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
