/**
 * Single Food Item in the Single Order
 */
 const FoodItem = ({ data }) => {
    return (
        <div>
            <h3>{data.name}</h3>
            <div className="price-qty">
                <p>Rs. {data.pricePerItem}</p>
                <p>Qty: {data.quantity}</p>
            </div>
        </div>
    );
}

export default FoodItem;