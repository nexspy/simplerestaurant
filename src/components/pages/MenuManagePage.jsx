import React from 'react';
import { Link } from 'react-router-dom';

import MenuManager from '../menu/MenuManager';

const MenuManagePage = () => {
    return (
        <div className="page">
            <div className="container">
                <h1>Manage Menu Items</h1>

                <nav>
                    <Link to={`/`}>
                        Back
                    </Link>

                    <Link to={`/menu/create`}>
                        Create Menu
                    </Link>
                </nav>

                <MenuManager />
                
            </div>
        </div>
    )
}

export default MenuManagePage;