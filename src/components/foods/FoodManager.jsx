import React, { useState, useEffect } from 'react';
import axios from 'axios';

import URLS from '../../api/urls.js';

import FoodSearch from './FoodSearch';
import MenuSuggestion from './MenuSuggestion';
import FoodList from './FoodList.jsx';

const FoodManager = () => {
    const default_perpage = 5;
    const [foods, setFoods] = useState([]);
    const [action, setAction] = useState('action_menu_add');
    const [foodSelectedList, setFoodSelectedList] = useState([]);
    const [showMenus, setShowMenus] = useState(false);
    const [menuSuggestion, setMenuSuggestion] = useState([]);
    const [search, setSearch] = useState('');
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

    const handleSearchChange = (search) => {
        setSearch(search);
    }

    const handleBulkChange = (e) => {
        var newValue = e.target.value;
        setAction(newValue);
        if (newValue == 'action_menu_add') {
            setShowMenus(true);
        } else {
            setShowMenus(false);
        }
    }

    const foodSelected = (food, checked) => {
        var temp = [];
        if (checked) {
            // add to list
            temp = [...foodSelectedList, food];
        } else {
            // remove from list
            for (var i=0; i<foodSelectedList.length; i++) {
                if (foodSelectedList[i]._id !== food._id) {
                    temp.push(foodSelectedList[i]);   
                }
            }
        }
        setFoodSelectedList(temp);
        console.log(temp);
    }

    const addFoodToMenu = () => {
        // add the food item in foodSelectedList to menu
        console.log(foodSelectedList)
    }

    const getMenus = () => {
        const url = URLS.base_url + URLS.menu.list;

        axios.get(url)
            .then((res) => {
                setMenuSuggestion(res.data.menus);
            })
            .catch((error) => {
                // 
            });
    }

    const getFoods = () => {
        const url = URLS.base_url + URLS.food.base + '?perpage=' + perpage + '&page=' + page + '&search=' + search;
        
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
        getMenus();
    }, []);
    
    useEffect(() => {
        getFoods();
    }, [ page, search ]);

    return (
        <div>
            <h2>Food list</h2>

            <FoodSearch handleSearchChange={handleSearchChange} />

            <select name="sel-bulk-option" onChange={handleBulkChange}>
                {/* <option value="action_menu_add">Add to menu</option> */}
                <option value="action_publish">Publish</option>
                <option value="action_unpublish">Unpublish</option>
            </select>

            {showMenus && menuSuggestion.length ? 
                <MenuSuggestion data={menuSuggestion} />
                : <></>
            }

            <button onClick={addFoodToMenu}>Apply</button>

            {loading ? (
                <p>loading...</p>
            ): (
                <FoodList data={foods} foodSelected={foodSelected} />
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