import Papa from "papaparse";

export type Customer = {
  slug: string;
  url: string;
};

export type Item = {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
};

const api = {
  customers: {
    fetch: async () => {
      const res = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9tw-eyssdzbxdVBt8Dcp04V23tTxXhOLUhVPNqd_b8P8Lylzs81wubzuiIOY-_2xlT-iUgy6V4lPr/pub?gid=0&single=true&output=csv"
      );
      const data = await res.text();
      const parsed = await new Promise<Customer[]>((resolve, reject) => {
        Papa.parse<Customer>(data, {
          header: true,
          complete: (result) => resolve(result.data),
          error: reject,
        });
      });

      return parsed;
    },
  },
  items: {
    fetch: async (url: string) => {
      const res = await fetch(url);
      const data = await res.text();
      const parsed = await new Promise<Item[]>((resolve, reject) => {
        Papa.parse<Item>(data, {
          header: true,
          complete: (result) => resolve(result.data),
          error: reject,
        });
      });

      return parsed;
    },
  },
};

export default api;
