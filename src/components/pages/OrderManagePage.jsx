import React from 'react';
import { Link } from 'react-router-dom';

const OrderManagePage = () => {
    return (
        <div class="page">
            <div className="container">
                <h1>Manage Order Items</h1>

                <Link to={`/`}>
                    Back
                </Link>
            </div>
        </div>
    )
}

export default OrderManagePage;