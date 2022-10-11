import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { baseURL } from "../konstanta/common";
import { DetailProduk, DetailToko } from "../types";
import axios from "axios";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button, Container } from "@mui/material";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import { formatCurrency } from "../utilities/formatCurrency";

function DetailProduct() {
  const { id } = useParams();
  const isFetching = useIsFetching();
  const { handleAddToCart, qty, setQty, cartItems } = UseShoppingCart();

  const fetchToko = () => {
    return axios.get(`${baseURL}api/setting`);
  };
  const FetchDetailProduk = () => {
    return axios.get(`${baseURL}/api/product/${id}`);
  };
  const { data: toko } = useQuery<DetailToko>(["toko"], fetchToko);
  const { data: detail, isLoading } = useQuery<DetailProduk>(
    ["detail", id],
    FetchDetailProduk
  );

  if (isFetching) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }
  //Checkout WA
  const handleRedirectWa = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${
        toko && toko?.data?.data?.whatsapp
      }&text=Hallo,%20saya%20ingin%20order%3A%0A%0A${
        detail && detail?.data?.data?.name
      }%20(x${qty})`,
      "_blank"
    );
  };
  // Add barang to Cart
  const handleClickedAdd = () => {
    handleAddToCart({
      id: detail?.data?.data?.id,
      name: detail?.data?.data?.name,
      price: detail?.data?.data?.price,
      quantity: qty,
    });
    Swal.fire("Selamat", "Produk telah ditambahkan di keranjang", "success");

    setQty(1);
  };
  // Handle Increment Input Barang
  const handleIncrement = () => {
    if (Number(detail && detail?.data?.data?.stock) > Number(qty)) {
      setQty(Number(qty) + 1);
    }
  };
  // Handle Decrement Input Barang
  const handleDecrement = () => {
    if (Number(qty) > 1) {
      setQty(Number(qty) - 1);
    }
  };
  // Handle Input Barang
  const handleChange = (e: any) => {
    setQty(Number(e.target.value));
    // }
  };

  return (
    <div className="fullheight">
      <Container>
        <div className="my-8">
          {isLoading ? (
            <div className="w-full h-screen py-32 mx-auto text-center">
              <CircularProgress color="secondary" size={96} />
            </div>
          ) : (
            <div className="w-full mx-auto my-12 border-2 card lg:card-side bg-base-100">
              <figure>
                <img
                  src={require("../assets/logo/icon-oren.png")}
                  alt="Item"
                  width={500}
                />
              </figure>
              <div className="card-body">
                <p className="mb-2">
                  Kategori:{" "}
                  <span className="badge badge-primary badge-outline">
                    {detail?.data?.data?.category}
                  </span>
                </p>
                <h2 className="card-title">{detail?.data?.data?.name}</h2>
                <h3 className="text-2xl font-bold">
                  {formatCurrency(Number(detail?.data?.data?.price))}
                </h3>
                <p>Sku: {detail?.data?.data?.sku}</p>
                <p>{detail?.data?.data?.description}</p>

                {/* Input Button Quantity */}
                <div className="">
                  <Button onClick={handleDecrement}>
                    <FaMinus />
                  </Button>
                  <input
                    pattern="\d+"
                    type="number"
                    placeholder=""
                    min={1}
                    max={detail?.data?.data?.stock}
                    className="w-16 input input-bordered"
                    value={qty}
                    onChange={handleChange}
                  />
                  <Button onClick={handleIncrement}>
                    <FaPlus />
                  </Button>
                  {/* Stok barang */}
                  <p className="flex inline-flex mx-2 text-sm opacity-50">
                    tersisa {"" + detail?.data && detail?.data?.data?.stock}{" "}
                    buah
                  </p>
                </div>
                <div>
                  {/* pesan apabila quantity barang lebih dari stock */}
                  {Number(qty) >
                    Number(detail && detail?.data?.data?.stock) && (
                    <h3 className="my-2 font-bold text-end text-rose-500">
                      Jumlah pesanan melebihi stok
                    </h3>
                  )}
                </div>
                <div className="justify-end py-2 card-actions">
                  {Number(qty) === 0 ||
                  Number(qty) > Number(detail && detail?.data?.data?.stock) ? (
                    <>
                      <button
                        className="btn btn-disabled text-cyan-500 btn-info btn-xs sm:btn-sm lg:btn-md"
                        onClick={() => handleClickedAdd()}
                      >
                        Tambah Keranjang
                      </button>
                      <button
                        className="btn btn-disabled btn-outline btn-info btn-xs sm:btn-sm lg:btn-md text-base-300"
                        onClick={handleRedirectWa}
                      >
                        Beli Sekarang
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className=" btn btn-info btn-sm sm:btn-sm lg:btn-md text-base-100"
                        onClick={() => handleClickedAdd()}
                      >
                        Tambah Keranjang
                      </button>
                      <button
                        className="btn btn-outline btn-info btn-sm sm:btn-sm lg:btn-md text-base-300"
                        onClick={handleRedirectWa}
                      >
                        Beli Sekarang
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default DetailProduct;
