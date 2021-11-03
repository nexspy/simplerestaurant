import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
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

                <div className="block">
                    <h2>Current Orders</h2>

                    <div className="actions">
                        <a href="#">View All</a>
                    </div>
                </div>
                

            </div>

        </div>
    )
};

export default HomePage;