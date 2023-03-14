import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import api from "~/api";
import { type Item } from "~/api";
import { useCartStore } from "~/zustand/store";

import Cart from "~/components/Cart";
import NavBar from "~/components/NavBar";
import ProductCard from "~/components/ProductCard";
import Modal from "~/components/Modal";
import ChooseHalf from "~/components/ChooseHalf";

type Props = {
  itemsList: Item[];
  promosList: Item[];
};

const Home: NextPage<Props> = ({ itemsList, promosList }: Props) => {
  const [items] = useState<Item[]>(itemsList);
  const [promos] = useState<Item[]>(promosList);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const [showHalfModal, setShowHalfModal] = useState(false);
  const [halfAdded, setHalfAdded] = useState("");

  return (
    <>
      <Head>
        <title>Shefris | Pizza Napoletana</title>
        <meta name="description" content="Shefris Napoletano" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://www.googletagmanager.com/gtag/" />
      </Head>

      {showHalfModal && (
        <Modal
          isOpen={showHalfModal}
          handleClose={() => {
            setShowHalfModal(false);
            decreaseQuantity(`mitad ${halfAdded}`);
            setHalfAdded("");
          }}
        >
          <ChooseHalf
            items={items}
            setShowHalfModal={setShowHalfModal}
            halfAdded={halfAdded}
          />
        </Modal>
      )}

      <NavBar slug="shefris" />

      <Cart />

      <main className="mx-auto max-w-7xl bg-white pt-[calc(70px_+_40px)] pb-10">
        <section className="grid grid-cols-auto-fit justify-items-center gap-y-16 ">
          {items?.map((item, i) => (
            <ProductCard
              key={i}
              product={item}
              setShowHalfModal={setShowHalfModal}
              setHalfAdded={setHalfAdded}
            />
          ))}
        </section>
        <section>
          <div className="mx-[calc((100%_-_300px)/2)] flex justify-start pt-24 font-dosis sm:mx-10">
            <h1 className="text-4xl font-bold underline">PROMOS</h1>
          </div>
          <div className="grid grid-cols-auto-fit justify-items-center gap-y-6 pt-10">
            {promos?.map((promo, i) => (
              <ProductCard key={i} product={promo} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let result;
  try {
    result = await api.items.fetch(process.env.NEXT_PUBLIC_DOC_URL!);
  } catch (err) {
    console.log("fetch error:", err);
  }

  return {
    props: {
      itemsList: result?.items,
      promosList: result?.promos,
    },
  };
};
