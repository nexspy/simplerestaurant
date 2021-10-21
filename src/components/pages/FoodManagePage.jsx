import React from 'react';
import { Link } from 'react-router-dom';
import FoodManager from '../foods/FoodManager';

const FoodManagePage = () => {
    return (
        <div className="page">
            <div className="container">
                <h1>Manage Food Items</h1>

                <nav>
                    <Link to={`/`}>
                        Back
                    </Link>

                    <Link to={`/food/create`}>
                        Add Food
                    </Link>
                </nav>

                <FoodManager />
            </div>
        </div>
    )
}

export default FoodManagePage;