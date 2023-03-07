import { OrderMessage } from "~/api";
import { formatPrice } from "./price";

type Message = {
  name: string;
  phone: string;
  shipment: string;
  location?: string;
  items: string;
  total: number;
};

export const generateWsMessage = (data: Message) => {
  const url = "https://api.whatsapp.com/send?text=";
  const message = `Hola! te paso el resumen de mi pedido:

*Nombre:* ${data.name}
*Teléfono:* ${data.phone}
*Entrega:* ${data.shipment}
*Departamento:* ${data.location}

*Pedido:* 
${data.items}

*Total:* ${formatPrice(data.total)}

Espero tu respuesta para confirmar mi pedido`;

  const phoneNumber = `&phone=${process.env.NEXT_PUBLIC_PHONE}`;

  return encodeURI(url + message + phoneNumber);
};
