import Papa from "papaparse";

export type Item = {
  name: string;
  description: string;
  price: string;
};

const api = {
  items: {
    fetch: async () => {
      const res = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSTMHAEm9sqnQ1b1w3aD6UvTRWZFME3b_oAhLT-ffG7Lgm1k5n4LcVvCNQbujaroRyGTV6c3LP-AVp/pub?output=csv"
      );
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
