import { Route, Routes } from "react-router-dom";
import { Navbar, Footer, ScrollToTop } from "@components";
import Home from "@pages/Home";
import Products from "@pages/products/Products";
import Cart from "@pages/cart/Cart";
import { OrderForm, ConfirmOrder } from "@pages/order";
import SobreNosotros from "@pages/AboutUs";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header><Navbar /></header>

      <main className="flex-grow container mx-auto p-4 pt-[6rem]">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/carrito/nuevo/:idProducto" element={<OrderForm />} />
          <Route path="/carrito/editar/:index" element={<OrderForm />} />
          <Route path="/carrito/confirmar" element={<ConfirmOrder />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
