import React, { useState, useEffect } from 'react';
import axios from 'axios';

import URLS from '../../api/urls.js';

import FoodList from './FoodList.jsx';

const FoodManager = () => {
    const default_perpage = 5;
    const [foods, setFoods] = useState([]);
    const [page, setPage] = useState(0);
    const [perpage, setPerpage] = useState(default_perpage);
    const [loading, setLoading] = useState(true);

    const handlePrevious = () => {
        setLoading(true);
        const newPage = page - 1;
        if (newPage >= 0) {
            setPage(newPage);
        }
    }
    
    const handleNext = () => {
        setLoading(true);
        const newPage = page + 1;
        setPage(newPage);
    }

    const getFoods = () => {
        const url = URLS.base_url + URLS.food.base + '?perpage=' + perpage + '&page=' + page;
        
        axios.get(url)
            .then((res) => {
                setFoods(res.data.foods);
                setLoading(false);
            })
            .catch((error) => {
                setFoods([]);
                setLoading(false);
            });
    }

    useEffect(() => {
        setPerpage(default_perpage);
    }, [])

    
    useEffect(() => {
        getFoods();
    }, [ page ]);

    return (
        <div>
            <h2>Food list</h2>

            {loading ? (
                <p>loading...</p>
            ): (
                <FoodList data={foods} />
            )}

            <div className="pagination">
                { page > 0 ? (
                    <button onClick={handlePrevious}>Prev</button>
                ): (
                    <p></p>
                )}
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default FoodManager;