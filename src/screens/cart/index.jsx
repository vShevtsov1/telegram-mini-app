import "./style.scss";
import CartItem from "../../components/CartItem/CartItem.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // Если ты используешь axios

const Cart = () => {
    const [items, setItems] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || {};
        const ids = Object.keys(cartFromStorage);
        if (ids.length === 0) {
            setItems([]);
            return;
        }

        axios.post('https://server.traff-baza.online/products/api/by-ids', ids, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                const products = res.data;
                const combined = products.map(product => ({
                    ...product,
                    quantity: cartFromStorage[product.id]?.quantity || 1,
                }));
                setItems(combined)
            })
            .catch((error) => {
                alert("Ошибка: " + (error.response?.data?.message || error.message));
                setItems([]);
            });
    }, []);

    const updateQuantity = (id, delta) => {
        setItems(prevItems =>
            prevItems
                .map(item => {
                    if (item.id === id) {
                        const newQuantity = item.quantity + delta;
                        if (newQuantity > item.available) return item;
                        if (newQuantity < 1) return item;
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0)
        );

        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[id]) {
            const newQuantity = cart[id].quantity + delta;
            if (newQuantity > 0 && newQuantity <= items.find(i => i.id === id)?.available) {
                cart[id].quantity = newQuantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };
    const handleCheckout = () => {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
            alert("Telegram WebApp не доступен");
            return;
        }

        const productsToSend = items.map(({ id, quantity }) => ({ id, quantity }));

        const payload = {
            items: productsToSend,
            initData: tg.initData
        };

        axios.post('https://server.traff-baza.online/orders/checkout', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if(
                    response.data.status === "failed"
                )
                {
                    alert(response.data.message);
                }
                else {
                    localStorage.removeItem('cart');
                    setItems([]);
                    navigate("/complete")
                }

            })
            .catch(error => {
                alert("Помилка при оформленні замовлення: " + (error.response?.data?.message || error.message));
            });
    };




    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));

        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <img src="/bg/Products/1.svg" alt="bg1" className="bg-svg bg-1" />
            <img src="/bg/Products/2.svg" alt="bg2" className="bg-svg bg-2" />
            <img src="/bg/Products/3.svg" alt="bg3" className="bg-svg bg-3" />

            <div className="cart-content">
                <div className="header">
                    <h1 className="title">Корзина</h1>
                    <img src="/bg/Products/4.svg" alt="bg4" />
                </div>

                <div className="cart_elements">

                    <div className="cart-items">
                        {items.length === 0 ? (
                            <p>Кошик порожній</p>
                        ) : (
                            items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))
                        )}
                    </div>

                    <div className="total">
                        <p>ЗАГАЛЬНА СУМА:</p>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button onClick={handleCheckout} className="checkout-btn">ПЕРЕЙТИ ДО ОПЛАТИ</button>
                </div>

            </div>
        </div>
    );
};

export default Cart;
