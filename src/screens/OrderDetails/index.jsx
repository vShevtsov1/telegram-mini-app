import "./style.scss"
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const OrderDetails = () => {
    const location = useLocation();
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {

        axios.get(`https://server.traff-baza.online/orders/${orderId}/details`)
            .then(response => {
                setOrderData(response.data);
            })
            .catch(() => {
                navigate('/orders')
            });
    }, [orderId]);

    if(orderData===null){
        return null;
    }
    return(
        <div className="order-details">
            {/* Фоновая графика */}
            <img src="/bg/Category/1.svg" alt="bg1" className="bg-svg bg-1" />
            <img src="/bg/Category/2.svg" alt="bg2" className="bg-svg bg-2" />
            <img src="/bg/Category/3.svg" alt="bg3" className="bg-svg bg-3" />

            <div className="order-details-content">
                <div className="header">
                    <h1 className="title">деталі Замовлення</h1>
                </div>

                <div className="products">

                    {orderData.map(({ product, accounts }) => (
                        <div className="product" key={product.id}>
                            <div className="product-data">
                                <img src={`data:image/png;base64,${product.image}`} alt={product.title} />

                                <h1>{product.name}</h1>
                            </div>
                            <div className="credentials">
                                {accounts.map((account, i) => (
                                    <div className="credential" key={i}>
                                        <p>Логін: <span>{account.username}</span></p>
                                        <p>Пароль: <span>{account.password}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                    }
                    <div className="product">
                        <div className="product-data">
                            <img src="https://cakeshop.com.ua/images/AcpSe7kFpmzMfgJUwhyXbNbja_gwkleunua5ZVM9jTQ/h:5000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC81NzEzXzEuanBn" alt=""/>
                            <h1>Назва товару</h1>
                        </div>
                        <div className="credentials">
                            <div className="credential">
                                <p>Логін: <span>login_name</span></p>
                                <p>Пароль: <span>12345678</span></p>
                            </div>
                            <div className="credential">
                                <p>Логін: <span>login_name</span></p>
                                <p>Пароль: <span>12345678</span></p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default OrderDetails;