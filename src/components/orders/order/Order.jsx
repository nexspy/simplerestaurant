import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const Order = ({ data }) => {

    let history = useHistory();
    const orderDate = moment(data.date).format('Do MMM YYYY, h:mm a');
    var total = 0;
    for (var i=0; i<data.foods.length; i++) {
        total += data.foods[i].total;
    }
    const statusClass = (data.status) ? 'inprogress' : 'complete';
    const status = (data.status) ? 'In Progress' : 'Completed';

    const foodList = data.foods.map((item, key) => {
        return <FoodItem data={item} key={item._id} />
    })

    const gotoEditForm = () => {
        history.push('/order/' + data._id + '/edit');
    }

    return (
        <div className={"order-item " + statusClass}>
            <div className="order-actions" onClick={gotoEditForm}>
                <div className="icon-edit"></div>
            </div>
            <p>Order : {data._id}</p>
            <h3>{orderDate}</h3>
            {foodList}
            <p className="order-total">Total: Rs. {total}</p>
            <div className="status-wrapper">
                <p className={"order-status status-" + statusClass}>{status}</p>
            </div>
        </div>
    );
}

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

export default Order;