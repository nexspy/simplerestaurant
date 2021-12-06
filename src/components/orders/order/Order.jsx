import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import FoodItem from '../../foods/food/FoodItem';

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
            <h3>{orderDate}</h3>
            {foodList}
            <p className="order-total">Total: $ {total}</p>
            <div className="status-wrapper">
                <p className={"order-status status-" + statusClass}>{status}</p>
            </div>
        </div>
    );
}



export default Order;