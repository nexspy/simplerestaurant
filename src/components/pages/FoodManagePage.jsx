import React from 'react';
import { Link } from 'react-router-dom';
import FoodManager from '../foods/FoodManager';

const FoodManagePage = () => {
    return (
        <div className="page">
            <div className="container">
                <h1>Manage Food Items</h1>

                <Link to={`/`}>
                    Back
                </Link>

                <FoodManager />
            </div>
        </div>
    )
}

export default FoodManagePage;