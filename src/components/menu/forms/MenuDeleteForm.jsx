import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import URLS from '../../../api/urls';

const MenuDelete = (data) => {

    const history = useHistory();
    const menuId = data.match.params.menuId;
    const [menu, setMenu] = useState({});

    const getMenu = () => {
        const url = URLS.base_url + URLS.menu.list + '/' + menuId;

        axios.get(url)
            .then((res) => {
                setMenu(res.data.menu);
            })
            .catch((error) => {
                // 
            });
    }

    const deleteMenu = () => {
        const url = URLS.base_url + URLS.menu.base;

        var data = {
            'id': menuId
        };

        axios.delete(`${url}/${menuId}/delete`, data)
            .then((res) => {
                // redirect
                history.push('/menu/manage');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        deleteMenu();
    }

    useEffect(() => {
        getMenu();
    }, []);

    return (
        <div className="container">
            <h1>Delete : {menu.name}</h1>

            <nav>
                <Link to={`/menu/${menuId}/view`}>
                    Back
                </Link>
            </nav>

            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    Do you want to delete this Menu <strong>'{menu.name}'</strong>?
                </div>

                <div className="form-item form-actions">
                    <button onClick={handleSubmit}>Delete</button>
                    <Link to={`/menu/${menuId}/view`}>
                        Cancel
                    </Link>
                </div>

            </form>

        </div>
    )
}

export default MenuDelete;