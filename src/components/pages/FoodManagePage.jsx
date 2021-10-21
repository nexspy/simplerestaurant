import React from 'react';
import { Link } from 'react-router-dom';

const FoodManagePage = () => {
    return (
        <div class="page">
            <div className="container">
                <h1>Manage Food Items</h1>

                <Link to={`/`}>
                    Back
                </Link>
            </div>
        </div>
    )
}

export default FoodManagePage;