import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FloatingWhatsApp from "react-floating-whatsapp";
import { baseURL } from "../konstanta/common";
import { Toko } from "../types";

const FloatingWa = () => {
  async function FetchNomerWa() {
    const { data } = await axios.get(`${baseURL}api/setting`);
    return data;
  }
  const { data } = useQuery<Toko>(["nomer-wa"], FetchNomerWa);

  return (
    <div>
      <FloatingWhatsApp
        phoneNumber={String(data?.data.whatsapp)}
        accountName="Admin"
        statusMessage="Online"
        chatMessage={`Hallo, Perkenalkan saya Admin ${String(
          data && data.data.name
        )} Ada yang dapat saya bantu?`}
      />
    </div>
  );
};

export default FloatingWa;
