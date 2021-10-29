import React from 'react';
import { Link } from 'react-router-dom';

import OrderManager from '../orders/OrderManager';

const OrderManagePage = () => {
    return (
        <div className="page">
            <div className="container">
                <h1>Manage Order Items</h1>

                <nav>
                    <Link to={`/`}>
                        Back
                    </Link>
                    <Link to={`/order/create`}>
                        Add Order
                    </Link>
                </nav>

                <OrderManager />
            </div>
        </div>
    )
}

export default OrderManagePage;