import Papa from "papaparse";
import { formatPrice } from "./utils/price";
import { generateWsMessage } from "./utils/wsMessaage";

export type OrderMessage = {
  name: string;
  phone: string;
  shipment: string;
  location?: string;
  items: Item[];
  total: number;
};

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
  category: string;
  varieties: string[];
  varieties2: string[];
};

export type SheetItem = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  varieties: string;
  varieties2: string;
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
      const parsed = await new Promise<SheetItem[]>((resolve, reject) => {
        Papa.parse<SheetItem>(data, {
          header: true,
          complete: (result) => resolve(result.data),
          error: reject,
        });
      });

      return parsed;
    },
  },
  whatsapp: {
    sendOrderMessage: async (data: OrderMessage) => {
      const items = data.items
        .map(
          (item) =>
            "x " +
            item.quantity +
            " " +
            item.name +
            "\n" +
            "subtotal = " +
            formatPrice(item.quantity * item.price)
        )
        .join("\n");

      return generateWsMessage({ ...data, items });
    },
  },
};

export default api;
