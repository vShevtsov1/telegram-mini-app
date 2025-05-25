import React from 'react';
import "./style.scss"
const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="cart-item">
            <div className="product-data">
                <img src={item.image} alt=""/>
                <div className="product_overview">
                    <p>{item.title}</p>
                    <span>${item.price}</span>
                </div>
            </div>
            <div className="controls">
                <button onClick={() => onQuantityChange(item.id, -1)}>
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="1.48843" width="39" height="38.8844" fill="black" stroke="white"/>
                        <path d="M29.5739 20.5237H11.124" stroke="white" stroke-linecap="round"/>
                    </svg>
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.id, 1)}>
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="1.48843" width="39" height="38.8844" fill="black" stroke="white"/>
                        <path d="M20.3495 11.2987V29.7486M29.5744 20.5237H11.1245" stroke="white" stroke-linecap="round"/>
                    </svg>

                </button>
            </div>
            <button className={"trash"} onClick={() => onRemove(item.id)}>
                <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.491211" y="0.5" width="51.1507" height="51" fill="black" stroke="white"/>
                    <path d="M17.1106 36.6364V15.9546H15.6333V14.4773H21.5424V13.3398H30.406V14.4773H36.3151V15.9546H34.8378V36.6364H17.1106ZM18.5878 35.1591H33.3606V15.9546H18.5878V35.1591ZM22.736 32.2046H24.2133V18.9091H22.736V32.2046ZM27.7351 32.2046H29.2124V18.9091H27.7351V32.2046Z" fill="white"/>
                </svg>

            </button>
        </div>
    );
};

export default CartItem;
