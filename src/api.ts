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
  address: string;
};

export type DeliveryPrice = {
  name: string;
  price: number;
};

export type Item = {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  half: boolean;
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
  delivery: {
    fetch: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_DOC_DELIVERY_URL!);
      const data = await res.text();
      const parsed = await new Promise<DeliveryPrice[]>((resolve, reject) => {
        Papa.parse<DeliveryPrice>(data, {
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
      const itemsRes = await fetch(url);
      const items = await itemsRes.text();
      const itemsParsed = await new Promise<SheetItem[]>((resolve, reject) => {
        Papa.parse<SheetItem>(items, {
          header: true,
          complete: (result) => resolve(result.data),
          error: reject,
        });
      });

      const promosRes = await fetch(process.env.NEXT_PUBLIC_DOC_PROMOS_URL!);
      const promos = await promosRes.text();
      const promosParsed = await new Promise<SheetItem[]>((resolve, reject) => {
        Papa.parse<SheetItem>(promos, {
          header: true,
          complete: (result) => resolve(result.data),
          error: reject,
        });
      });

      return { items: itemsParsed, promos: promosParsed };
    },
  },
  whatsapp: {
    sendOrderMessage: (data: OrderMessage) => {
      const items = data.items
        .map(
          (item) =>
            "x " +
            (item.half ? "Mitad" : "") +
            String(item.quantity) +
            " " +
            (item.image ? item.name : "PROMO ") +
            item.name +
            "\n" +
            "subtotal = " +
            String(formatPrice(item.quantity * item.price))
        )
        .join("\n");

      return generateWsMessage({ ...data, items });
    },
  },
};

export default api;
