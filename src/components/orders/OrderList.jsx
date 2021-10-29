import React from 'react';

import Order from './order/Order';

const OrderList = ({ data }) => {

    const list = data.map((item, key) => {
        return <Order data={item} key={key} />
    })

    return (
        <div className="order-list">
            {list}
        </div>
    )
};

export default OrderList;