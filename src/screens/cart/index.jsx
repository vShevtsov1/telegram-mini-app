import "./style.scss";
import CartItem from "../../components/CartItem/CartItem.jsx";
import { useState } from "react";

const initialItems = [
    {
        id: 1,
        title: "Назва товару 1",
        price: 25.99,
        quantity: 1,
        image: "https://www.medgorod.ru/sites/default/files/styles/gallery-slider-mobile/public/article_photo/produkty.jpg?itok=_T3D-Cnd",
    },
    {
        id: 2,
        title: "Назва товару 2",
        price: 15.5,
        quantity: 2,
        image: "https://www.medgorod.ru/sites/default/files/styles/gallery-slider-mobile/public/article_photo/produkty.jpg?itok=_T3D-Cnd",
    },
    {
        id: 3,
        title: "Назва товару 3",
        price: 40.0,
        quantity: 1,
        image: "https://www.medgorod.ru/sites/default/files/styles/gallery-slider-mobile/public/article_photo/produkty.jpg?itok=_T3D-Cnd",
    },
];

const Cart = () => {
    const [items, setItems] = useState(initialItems);

    const updateQuantity = (id, delta) => {
        setItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                )
                .filter((item) => item.quantity > 0) // удаляем товары с quantity <= 0
        );
    };



    const removeItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
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
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onQuantityChange={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    <div className="total">
                        <p>ЗАГАЛЬНА СУМА:</p>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button className="checkout-btn">ПЕРЕЙТИ ДО ОПЛАТИ</button>
                </div>

            </div>
        </div>
    );
};

export default Cart;
