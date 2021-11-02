import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuList from './MenuList';

import URLS from '../../api/urls';

const MenuManager = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [menus, setMenus] = useState([]);

    const getMenu = () => {
        const url = URLS.base_url + URLS.menu.list;
        axios.get(url)
            .then((res) => {
                setMenus(res.data.menus);
                setIsLoading(false);
            })
            .catch((error) => {
            });
    }   

    useEffect(() => {
        getMenu();
    }, []);

    return (
        <div className="menumanager">
            <h2>Menus list</h2>

            {isLoading ? (
                <div>loading..</div>
            ) : (
                <MenuList data={menus} />
            )}
        </div>
    )
}

export default MenuManager;