import React, { useState, useEffect } from 'react';
import axios from 'axios';

import URLS from '../../api/urls.js';

import FoodList from './FoodList.jsx';

const FoodManager = () => {

    const [foods, setFoods] = useState([]);
    // const [loading, setLoading] = useState(true);

    const getFoods = () => {
        const url = URLS.base_url + URLS.food.base;
        
        axios.get(url)
            .then((res) => {
                setFoods(res.data.foods);
                // setLoading(false);
            })
            .catch((error) => {
                setFoods([]);
            });
    }

    useEffect(() => {
        getFoods();
    }, []);

    return (
        <div>
            <h2>Food list</h2>

            <FoodList data={foods} />
        </div>
    );
};

export default FoodManager;