import "./style.scss"
import {useNavigate} from "react-router-dom";
const CategoryItem  = ({category}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products?categoryId=${category.id}`);


    };
    return(
        <div className="category" onClick={handleClick}>
            <img width={"100%"} height={163}  src={`data:image/jpeg;base64,${category.image}`} alt=""/>
            <p>{category.name}</p>
        </div>
    )
}
export default CategoryItem;