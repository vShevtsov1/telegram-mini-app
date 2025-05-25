import React, { useEffect, useState } from 'react';
import './ProductCard.scss';

const ProductCard = ({ image, title, description, price, id }) => {
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[id]) {
            setInCart(true);
        }
    }, [id]);

    const handleCartToggle = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        if (cart[id]) {
            delete cart[id];
            setInCart(false);
        } else {
            cart[id] = { quantity: 1 };
            setInCart(true);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div className="product-card">
            <div className="product-card__image">
                {image && <img src={`data:image/png;base64,${image}`} alt={title} />}
            </div>
            <div className="product-card__content">
                <div>
                    <h2 className="product-card__title">{title || 'Назва товару'}</h2>
                    <p className="product-card__description">{description || 'Опис товару'}</p>
                </div>
                <div className="product-card__bottom">
                    <span className="product-card__price">${price || '0.00'}</span>
                    <button className="product-card__button" onClick={handleCartToggle}>
                        {inCart ? '− Видалити' : '+ В КОШИК'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
