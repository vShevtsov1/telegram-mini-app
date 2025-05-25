import React from 'react';
import './ProductCard.scss';

const ProductCard = ({ image, title, description, price }) => {
    return (
        <div className="product-card">
            <div className="product-card__image">
                {image && <img src={image} alt={title} />}
            </div>
            <div className="product-card__content">
                <div>
                    <h2 className="product-card__title">{title || 'Назва товару'}</h2>
                    <p className="product-card__description">{description || 'Опис товару'}</p>
                </div>
                <div className="product-card__bottom">
                    <span className="product-card__price">${price || '0.00'}</span>
                    <button className="product-card__button">+ В КОШИК</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
