import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import URLS from '../../../api/urls';

const MenuView = (data) => {
    const menuId = data.match.params.menuId;
    const [menu, setMenu] = useState({ foods: [] });

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

    useEffect(() => {
        getMenu();
    }, []);

    return (
        <div className="container">
            <h1>{menu.name} <span>: Menu</span></h1>

            <nav>
                <Link to={`/menu/manage`}>
                    Back
                </Link>
                <Link to={`/menu/${menuId}/edit`}>
                    Edit
                </Link>
            </nav>

            <FoodItemList data={menu.foods} />
        </div>
    );
}

const FoodItemList = ({ data }) => {
    const list = data.map((item, key) => {
        return <FoodItemCard data={item} key={key} />;
    });

    return (
        <div>
            {list}
        </div>
    )
}

const FoodItemCard = ({ data }) => {
    return (
        <div className="food-item">
            <h3>{data.name}</h3>
        </div>
    )
}

export default MenuView;