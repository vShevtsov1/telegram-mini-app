import Layout from "./components/Layout/Layout.jsx";
import {Route, Routes} from "react-router-dom";
import Category from "./screens/category/index.jsx";
import Profile from "./screens/profile/index.jsx";
import Products from "./screens/Products/index.jsx";
import Cart from "./screens/cart/index.jsx";
import OrderComplete from "./screens/orderComplete/index.jsx";
import Referal from "./screens/referal/index.jsx";
import {useEffect} from "react";

function App() {

    alert(window.Telegram);

  return (
      <Layout>
          <Routes>
              <Route path="/" element={<Category />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/complete" element={<OrderComplete />} />
              <Route path="/referal" element={<Referal />} />
          </Routes>
      </Layout>
  )
}

export default App
