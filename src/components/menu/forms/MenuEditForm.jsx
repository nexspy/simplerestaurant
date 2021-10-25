import React from 'react';
import { Link } from 'react-router-dom';

const MenuEditForm = (data) => {

    const id = data.match.params.menuId;

    return (
        <div className="container">
            <h1>Edit Form</h1>

            <nav>
                <Link to={`/menu/${id}/view`}>
                    Back
                </Link>
            </nav>
        </div>
    )
}

export default MenuEditForm;