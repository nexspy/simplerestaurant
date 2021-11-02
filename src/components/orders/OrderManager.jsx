import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import URLS from '../../api/urls';
import OrderList from './OrderList';

const OrderManager = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        const url = URLS.base_url + URLS.order.base;

        axios.get(url)
            .then((res) => {
                setOrders(res.data.orders);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="order-manager-wrapper">
            <h2>Order Manager</h2>

            {isLoading ? (
                <div>loading...</div>
            ) : (
                <OrderList data={orders} />
            )}
            
        </div>
    )
}

export default OrderManager;