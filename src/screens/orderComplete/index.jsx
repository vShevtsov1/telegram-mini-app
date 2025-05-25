import "./style.scss"

const OrderComplete = () => {

    return(
        <div className={"complete-page"}>

            <img src="/bg/complete/1.svg" className={"bg-svg bg1"} />

            <div className="thank-modal">
                <img src="/bg/complete/2.svg" alt=""/>
                <h1>Дякуємо за покупку!</h1>
                <div className="buttons">
                    <button>на головну</button>
                    <button>Переглянути мої покупки</button>
                </div>
                <img src="/bg/complete/3.svg" alt=""/>
            </div>
        </div>
    )
}
export default OrderComplete