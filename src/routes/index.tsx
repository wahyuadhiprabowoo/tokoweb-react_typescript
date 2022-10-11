import { BrowserRouter, Route, Routes } from "react-router-dom";
import FloatingWa from "../components/FloatingWa";
import Foot from "../components/Foot";
import Header from "../components/Header";
import Produk from "../components/Produk";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { Cart } from "../pages/Cart";
import DetailProduct from "../pages/DetailProduct";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export default function index() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/produk" element={<Produk />}></Route>
          <Route path="/produk/:id" element={<DetailProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <FloatingWa />
        <Foot />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}
