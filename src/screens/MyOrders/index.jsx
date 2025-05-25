import CategoryItem from "../../components/Category/Category.jsx";
import "./style.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const MyOrders = () => {

    const [orders,setOrders] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
            console.warn("Telegram WebApp not available");
            return;
        }

        const initData = tg.initData;

        axios.post("https://server.traff-baza.online/orders/orders", null, {
            params: {
                initData: initData
            }
        }).then(res => {

            const userData = res.data.orders;
            setOrders(userData);


        }).catch(err => {
            console.error("⚠️ Ошибка запроса:", err);
        });
    }, []);

    return(
        <div className="myorders-page">
            {/* Фоновая графика */}
            <img src="/bg/Category/1.svg" alt="bg1" className="bg-svg bg-1" />
            <img src="/bg/Category/2.svg" alt="bg2" className="bg-svg bg-2" />
            <img src="/bg/Category/3.svg" alt="bg3" className="bg-svg bg-3" />

            <div className="myorders-content">
                <div className="header">
                    <h1 className="title">Замовлення</h1>
                </div>



                <div className="orders">

                    {
                        orders.map((order, index) => {
                            const date = new Date(order.orderDate);
                            const day = date.getDate();
                            const month = date.toLocaleString('uk-UA', { month: 'short' });
                            return (
                                <div onClick={() => navigate(`/details/${order.orderId}`)} className="order" key={index}>

                                <h1>
                                        Замовлення від {day} {month}
                                    </h1>
                                    <div className="price">
                                        {order.price}$
                                    </div>
                                </div>
                            );
                        })
                    }



                </div>
            </div>
        </div>
    )
}
export default MyOrders;