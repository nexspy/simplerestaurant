import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="page">
            
            <div className="container">
                <h1 className="title">Home</h1>

                <nav>
                    <Link to={`/menu/manage`}>
                        Menu
                    </Link>
                    <Link to={`/food/manage`}>
                        Food Items
                    </Link>
                    <Link to={`/order/manage`}>
                        Orders
                    </Link>
                </nav>

            </div>

        </div>
    )
};

export default HomePage;