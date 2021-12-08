import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";

import URLS from '../../api/urls';
import OrderList from './OrderList';
import DateRangeOrder from './forms/DateRangeOrder';

const OrderManager = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [exportOrders, setExportOrders] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const getOrders = () => {
        var url = URLS.base_url + URLS.order.base;

        if (startDate.length && endDate.length) {
            url += `?startDate=${startDate} 00:00:00&endDate=${endDate} 23:59:59`;
        }

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
                    item.id = tempOrder._id;
                    delete item._id;
                    item.total += food.total;
                    item.date = order.date;
                    tempOrders.push(item);
                });
            }
        });
        return tempOrders;
    }

    const dateChanged = (from, to) => {
        setStartDate(from);
        setEndDate(to);
    }

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        getOrders();
    }, [startDate, endDate]);

    useEffect(() => {
        if (orders.length) {
            var tempOrders = convertToTransaction();
            setExportOrders(tempOrders);
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
                        <div className="btn-export">
                            <CSVLink 
                                data={exportOrders}
                                filename={ "report-" + Date.now() + ".csv"}
                            >Export as CSV</CSVLink>
                        </div>

                        <DateRangeOrder dateChanged={dateChanged} />
                    </div>

                    <OrderList data={orders} />    
                </div>
            )}
            
        </div>
    )
}

export default OrderManager;