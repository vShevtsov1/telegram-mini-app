import Layout from "./components/Layout/Layout.jsx";
import {Route, Routes} from "react-router-dom";
import Category from "./screens/category/index.jsx";
import Profile from "./screens/profile/index.jsx";
import Products from "./screens/Products/index.jsx";
import Cart from "./screens/cart/index.jsx";
import OrderComplete from "./screens/orderComplete/index.jsx";
import Referal from "./screens/referal/index.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import MyOrders from "./screens/MyOrders/index.jsx";
import OrderDetails from "./screens/OrderDetails/index.jsx";

function App() {

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
    
        if (!tg) {
            console.warn("Telegram WebApp not available");
            return;
        }
    
        const initData = tg.initData;
    
        axios.post("https://server.traff-baza.online/telegram/verify", null, {
            params: {
                initData: initData
            }
        }).then(res => {
            if (res.data.status === "ok") {
                const userData = JSON.parse(res.data.user);
                setUser(userData);
                console.log("✅ Пользователь прошёл проверку:", userData);
            } else {
                console.error("❌ Ошибка проверки:", res.data.message);
            }
        }).catch(err => {
            console.error("⚠️ Ошибка запроса:", err);
        });
    }, []);

    if(user===null){
        return null;
    }
  return (
      <Layout>
          <Routes>
              <Route path="/" element={<Category />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/complete" element={<OrderComplete />} />
              <Route path="/referal" element={<Referal />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/details/:orderId" element={<OrderDetails />} />


          </Routes>
      </Layout>
  )
}

export default App
