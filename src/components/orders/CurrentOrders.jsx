import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import URLS from '../../api/urls';
import FoodItem from '../foods/food/FoodItem';

const CurrentOrders = () => {
    let history = useHistory();
    const [orders, setOrders] = useState([]);

    const getCurrentOrders = async (req, res) => {
        const url= URLS.base_url + URLS.order.current;
        
        axios.get(url)
        .then((res) => {
            if (res.data.success) {
                setOrders(res.data.orders);
            }
        });
    }

    useEffect(() => {
        getCurrentOrders();
    }, []);

    return (
        <div className="block">
            <h2>Current Orders</h2>

            <div className="actions">
                <Link to="/order/manage?type=current" className="btn">
                    View All
                </Link>
            </div>

            <OrderList data={orders} />

        </div>
    );
}

const OrderList = ({ data }) => {
    const list = data.map((item, key) => {
        return <OrderItem key={key} data={item} />
    })

    return (
        <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            { list }
            </Masonry>
    )
}

const OrderItem = ({ data }) => {
    const foodList = data.foods.map((item, key) => {
        return <FoodItem data={item} key={item._id} />
    })

    return (
        <div className="order-item">
            <p>Order ID : { data._id }</p>

            <p>Table : { data.table }</p>

            <div className="food-list">
                { foodList }
            </div>

        </div>
    )
}

export default CurrentOrders;