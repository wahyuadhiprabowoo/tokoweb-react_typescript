import { Link } from "react-router-dom";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toko } from "../types";
import axios from "axios";
import { baseURL } from "../konstanta/common";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  async function FetchHeader() {
    const { data } = await axios.get(`${baseURL}api/setting`);
    return data;
  }
  const { data } = useQuery<Toko>(["judul-toko"], FetchHeader);
  const [navbar, setNavbar] = useState(false);

  const { cartItems } = UseShoppingCart();

  return (
    <nav className="max-w-full shadow bg-base-300">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div className="flex items-center">
              <Link to={"/"}>
                <img
                  src={require("../assets/logo/hylos.png")}
                  width={50}
                  alt="logo-hylos"
                />
              </Link>
              <Link
                to={"/"}
                className="px-2 text-xl text-gray-600 hover:text-blue-600"
              >
                {data?.data?.name}
              </Link>
            </div>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-xl text-gray-600 hover:text-blue-600">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="text-xl text-gray-600 hover:text-blue-600">
                <Link to={"/produk"}>Produk</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to={"/cart"}>
                  <IconButton aria-label="cart">
                    <StyledBadge
                      badgeContent={cartItems.length}
                      color="primary"
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    // <nav className="">
    //   <div className="navbar bg-base-300">
    //     <div className="flex-1">
    //       <Link to={"/"} className="text-xl normal-case ">
    //         <img src={data?.data?.image} alt="Logo" width={45} />
    //       </Link>
    //       <Link to={"/"} className="pl-4 text-xl normal-case btn btn-ghost">
    //         {data?.data?.name}
    //       </Link>
    //       <Link
    //         to={"/produk"}
    //         className="pl-4 text-xl normal-case btn btn-ghost"
    //       >
    //         Produk
    //       </Link>
    //     </div>
    //     <div className="flex-none">
    //       <Link to={"/cart"}>
    //         <IconButton aria-label="cart">
    //           <StyledBadge badgeContent={cartItems.length} color="primary">
    //             <ShoppingCartIcon />
    //           </StyledBadge>
    //         </IconButton>
    //       </Link>
    //     </div>
    //   </div>
    // </nav>
  );
};
export default Header;
