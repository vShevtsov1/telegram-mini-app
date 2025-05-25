import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const Products = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("categoryId");
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!categoryId) return;

        setLoading(true);
        setError(null);

        axios
            .get(`https://server.traff-baza.online/products/by-category/${categoryId}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => {
                setError("Помилка при завантаженні товарів");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={"products-page"}>
            <img src="/bg/Products/1.svg" alt="bg1" className="bg-svg bg-1" />
            <img src="/bg/Products/2.svg" alt="bg2" className="bg-svg bg-2" />
            <img src="/bg/Products/3.svg" alt="bg3" className="bg-svg bg-3" />

            <div className="products-content">
                <div className="header">
                    <h1 className="title">Товари</h1>
                    <img src="/bg/Products/4.svg" alt="bg1" />
                </div>

                <div className="products-nav">
                    <div className="products-search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M21.875 21.875L17.7083 17.7083M19.7917 11.4583C19.7917 13.6685 18.9137 15.7881 17.3509 17.3509C15.7881 18.9137 13.6685 19.7917 11.4583 19.7917C9.2482 19.7917 7.12858 18.9137 5.56578 17.3509C4.00297 15.7881 3.125 13.6685 3.125 11.4583C3.125 9.2482 4.00297 7.12858 5.56578 5.56578C7.12858 4.00297 9.2482 3.125 11.4583 3.125C13.6685 3.125 15.7881 4.00297 17.3509 5.56578C18.9137 7.12858 19.7917 9.2482 19.7917 11.4583Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input
                            type="text"
                            placeholder={"Пошук по товарам"}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div  onClick={() => navigate("/cart")} className="option">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M9.74396 28.1547C9.18129 28.1547 8.70707 27.9618 8.32129 27.576C7.93551 27.1902 7.74307 26.7164 7.74396 26.1547C7.74485 25.5929 7.93729 25.1187 8.32129 24.732C8.70707 24.3471 9.18129 24.1547 9.74396 24.1547C10.3066 24.1547 10.7804 24.3471 11.1653 24.732C11.5502 25.1169 11.7431 25.5911 11.744 26.1547C11.7448 26.7182 11.552 27.192 11.1653 27.576C10.7786 27.96 10.3048 28.1529 9.74396 28.1547ZM22.256 28.1547C21.6942 28.1547 21.2204 27.9618 20.8346 27.576C20.4488 27.1902 20.256 26.7164 20.256 26.1547C20.256 25.5929 20.4488 25.1187 20.8346 24.732C21.2204 24.3471 21.6942 24.1547 22.256 24.1547C22.8177 24.1547 23.292 24.3471 23.6786 24.732C24.0635 25.1178 24.256 25.592 24.256 26.1547C24.256 26.7164 24.0635 27.1902 23.6786 27.576C23.2928 27.9618 22.8186 28.1547 22.256 28.1547ZM7.84129 7.33333L11.4 14.8213H20.7333L24.836 7.33333H7.84129ZM7.18929 5.99999H27.0866L21.5306 16.1547H10.8L8.61463 20.1547H24.256V21.488H6.32129L9.97996 14.9547L5.07729 4.66666H2.66663V3.33333H5.92263L7.18929 5.99999Z" fill="white"/>
                        </svg>
                    </div>
                </div>

                <div className="products">
                    {loading && <p>Завантаження...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!loading && products.length === 0 && <p>Товари не знайдено.</p>}

                    {filteredProducts.map((product) => (
                        <ProductCard
                            id={product.id}
                            key={product.id} // обязательно уникальный ключ
                            image={product.image || "https://via.placeholder.com/128"}
                            title={product.name}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
