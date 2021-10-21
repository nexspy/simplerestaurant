import React from 'react';
import { Link } from 'react-router-dom';

const MenuManagePage = () => {
    return (
        <div class="page">
            <div className="container">
                <h1>Manage Menu Items</h1>

                <Link to={`/`}>
                    Back
                </Link>
            </div>
        </div>
    )
}

export default MenuManagePage;