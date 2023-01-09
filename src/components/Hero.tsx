import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL } from "../konstanta/common";
import { Toko } from "../types";

function Hero() {
  async function FetchToko() {
    const { data } = await axios.get(`${baseURL}api/setting`);
    return data;
  }
  const { data } = useQuery<Toko>(["hero"], FetchToko);

  return (
    <div className="max-h-full mt-4 hero bg-base-200">
      <Container>
        <div className="text-center hero-content">
          <div className="max-w-md">
            <img
              src={require("../assets/logo/hylos.png")}
              alt="Logo"
              className="mx-auto sm:w-64 md:w-72 "
              width={240}
            />
            <h1 className="text-5xl font-bold">{data?.data?.name}</h1>
            <p className="py-6">{data?.data?.description}</p>
            <Link to={"/produk"}>
              <button className="mb-4 text-white btn btn-info">
                Lihat Produk
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
