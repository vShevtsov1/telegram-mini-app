import "./style.scss"
import CategoryItem  from "../../components/Category/Category.jsx";
const Category = () => {


    return(
        <div className="categories-page">
            {/* Фоновая графика */}
            <img src="/bg/Category/1.svg" alt="bg1" className="bg-svg bg-1" />
            <img src="/bg/Category/2.svg" alt="bg2" className="bg-svg bg-2" />
            <img src="/bg/Category/3.svg" alt="bg3" className="bg-svg bg-3" />

            <div className="category-content">
                <div className="header">
                    <h1 className="title">Категорії</h1>
                    <img src="/bg/Category/4.svg" alt="bg1"  />
                </div>

                <div className="search-bar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M21.875 21.875L17.7083 17.7083M19.7917 11.4583C19.7917 13.6685 18.9137 15.7881 17.3509 17.3509C15.7881 18.9137 13.6685 19.7917 11.4583 19.7917C9.2482 19.7917 7.12858 18.9137 5.56578 17.3509C4.00297 15.7881 3.125 13.6685 3.125 11.4583C3.125 9.2482 4.00297 7.12858 5.56578 5.56578C7.12858 4.00297 9.2482 3.125 11.4583 3.125C13.6685 3.125 15.7881 4.00297 17.3509 5.56578C18.9137 7.12858 19.7917 9.2482 19.7917 11.4583Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input type="text" placeholder={"Пошук по категорії"}/>
                </div>

                <div className="categories">
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                <CategoryItem/>
                </div>
            </div>
        </div>
    )

}
export default Category;