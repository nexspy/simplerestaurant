import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CurrentOrders from '../orders/CurrentOrders';

const HomePage = () => {

    const [pin, setPin] = useState('');

    useEffect(() => {
        // 
    }, []);

    return (
        <div className="page">
            
            <div className="container">
                <h1 className="title">Ions Restro</h1>
                <div className="motto">Easy restaurant management software</div>

                <nav>
                    <Link to={`/menu/manage`}>
                        Menu
                    </Link>
                    <Link to={`/food/manage`}>
                        Food Items
                    </Link>
                    <Link to={`/order/manage`}>
                        Order History
                    </Link>
                </nav>

                <CurrentOrders />

            </div>

        </div>
    )
};

export default HomePage;