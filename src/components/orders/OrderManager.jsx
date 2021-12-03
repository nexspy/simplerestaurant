import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";

import URLS from '../../api/urls';
import OrderList from './OrderList';

const OrderManager = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [exportOrders, setExportOrders] = useState([]);

    const getOrders = () => {
        const url = URLS.base_url + URLS.order.base;

        axios.get(url)
            .then((res) => {
                setOrders(res.data.orders);
                setIsLoading(false);
            });
    }

    const convertToTransaction = () => {
        var tempOrders = [];
        orders.map((order) => {
            var tempOrder = JSON.parse(JSON.stringify(order));
            if (typeof tempOrder.foods !== 'undefined') {
                tempOrder.total = 0;
                tempOrder.foods.map((food) => {
                    var item = JSON.parse(JSON.stringify(food));
                    item.id = food._id;
                    delete item._id;
                    item.total += food.total;
                    item.date = order.date;
                    tempOrders.push(item);
                });
            }
        });
        return tempOrders;
    }

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        if (orders.length) {
            var tempOrders = convertToTransaction();
            setExportOrders(tempOrders);
            console.log(tempOrders);
        }
    }, [orders]);

    return (
        <div className="order-manager-wrapper">
            <h2>Order Manager</h2>

            {isLoading ? (
                <div>loading...</div>
            ) : (
                <div>
                    <div className="block">
                        <CSVLink 
                            data={exportOrders}
                            filename={ "report-" + Date.now() + ".csv"}
                        >Export as CSV</CSVLink>
                    </div>
                    <OrderList data={orders} />    
                </div>
            )}
            
        </div>
    )
}

export default OrderManager;