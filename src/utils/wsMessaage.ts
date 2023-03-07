import { OrderMessage } from "~/api";
import { formatPrice } from "./price";

export const generateWsMessage = (data: OrderMessage) => {
  const url = "https://api.whatsapp.com/send?text=";
  const message = `Hola! te paso el resumen de mi pedido:

*Nombre:* ${data.name}
*Teléfono:* ${data.phone}
*Entrega:* ${data.shipment}
*Departamento:* ${data.location}

*Pedido:* 
${data.cart}

*Total:* ${formatPrice(data.total)}

Espero tu respuesta para confirmar mi pedido`;

  const phoneNumber = "&phone=542647433662";

  return encodeURI(url + message + phoneNumber);
};
