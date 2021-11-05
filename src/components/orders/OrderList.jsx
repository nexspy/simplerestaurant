import React from 'react';
import Masonry from 'react-masonry-css';

import Order from './order/Order';

const OrderList = ({ data }) => {

    const list = data.map((item, key) => {
        return <Order data={item} key={key} />
    })

    return (
        <Masonry
            breakpointCols={3}
            className="my-masonry-grid order-list"
            columnClassName="my-masonry-grid_column">
            {list}
        </Masonry>
    )
};

export default OrderList;