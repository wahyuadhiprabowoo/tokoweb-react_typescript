import { Grid, Button, Container } from "@mui/material";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { DetailToko } from "../types";
import axios from "axios";
import { baseURL } from "../konstanta/common";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const Cart = () => {
  const { cartItems, handleDeleteCart } = UseShoppingCart();
  const fetchToko = () => {
    return axios.get(`${baseURL}api/setting`);
  };
  const { data: toko } = useQuery<DetailToko>(["toko-cart"], fetchToko);

  const handleRedirectWa = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${
        toko && toko?.data?.data?.whatsapp
      }&text=Hallo,%20saya%20ingin%20order%3A%0A%0A${cartItems.map(
        (value) => `${"-"}%20${value.name}%20(x${value.quantity})%0A`
      )}`,
      "_blank"
    );
  };

  return (
    <div className="fullheight">
      <Container>
        {cartItems.length === 0 ? (
          <div className="w-full mx-auto my-24 text-base border-2 card card-normal md:w-96 bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Keranjang</h2>
              <hr className="border-2 " />
              <h3 className="font-semibold text-center">Tidak Ada Barang</h3>
              <hr className="border-2 " />
              <div className="justify-end card-actions">
                <Link to={"/"}>
                  {" "}
                  <button className="mt-4 btn btn-xs btn-ghost btn-outline sm:btn-sm md:btn-md">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={2}
            gap={{ xs: 2, sm: 2, md: 4, lg: 10 }}
            // columns={{ xs: 4, sm: 6, md: 8 }}
          >
            <Grid item xs={12} sm={12} md={6} lg={7}>
              {cartItems.map((value) => (
                <Item className="flex justify-around my-6 border-2">
                  <div className="flex text-lg font-semibold">{value.name}</div>
                  <div className="flex text-lg font-semibold">
                    {value.quantity}
                  </div>
                  <div className="flex">
                    <Button
                      onClick={() => handleDeleteCart(value.id)}
                      size="medium"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </Item>
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className="w-full mx-auto bg-white border-2 card card-normal">
                <div className="card-body">
                  <h2 className="card-title">{`Total Item: (${cartItems.length})`}</h2>
                  <hr className="border-2 " />
                  <div className="flex">
                    <h3 className="flex-1 font-bold">Total Price:</h3>
                    <h3 className="text-xl font-bold flex-0">
                      {formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                          const item = cartItems.find(
                            (i) => i.id === cartItem.id
                          );
                          return (
                            total +
                            (item?.price || 0) * Number(cartItem.quantity)
                          );
                        }, 0)
                      )}
                    </h3>
                  </div>
                  <hr className="border-2" />
                  <div className="justify-end mt-4 card-actions">
                    <button
                      onClick={handleRedirectWa}
                      className="btn btn-xs btn-ghost btn-outline sm:btn-sm md:btn-md"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};
