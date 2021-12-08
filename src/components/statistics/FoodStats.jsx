import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import URLS from '../../api/urls';
import useFoodAPI from '../hooks/foods/useFoodAPI';
import useOrderAPI from '../hooks/orders/useOrderAPI';
import DateFilter from '../forms/DateFilter';

const FoodStats = () => {
    const urlOrders = URLS.base_url + URLS.order.base;
    const urlFoods = URLS.base_url + URLS.food.base + '?perpage=100000&page=0&search=';

    const [orderFilters, setOrderFilters] = useState([]);
    const { loading, error, orders } = useOrderAPI(urlOrders, orderFilters);
    const { loadingFoods, errorFoods, foods} = useFoodAPI(urlFoods);
    const [foodResult, setFoodResult] = useState([]);

    const [foodFilter, setFoodFilter] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const foodChanged = (food) => {
        console.log(food);
    }

    const getUniqueArray = (myArray) => {
        return myArray.filter((v, i, a) => a.indexOf(v) === i);
    }

    const getUniqueFoods = () => {
        var tempFoodNames = [];
        orders.map((order) => {
            order.foods.map((item) => {
                tempFoodNames.push(item.id);
            });
        });
        return getUniqueArray(tempFoodNames);
    }

    const dateChanged = (from, to) => {
        setStartDate(from);
        setEndDate(to);
    }

    /**
     * Create list of food items with number of sales (quantity)
     */
    const calculateFoodCount = () => {
        var temp = [];
        var uniqueFoods = getUniqueFoods();
        var finalList = [];

        uniqueFoods.map((item) => {
            temp.push({
                'id': item,
                'count': 0
            });
        });

        orders.map((order) => {
            order.foods.map((item) => {
                temp.map((row, key) => {
                    if (item.id == row.id) {
                        temp[key].count += item.quantity;
                    }
                })
            })
        });

        return temp;
    }
    
    const calculateFoodStatistics = () => {
        var countedFoodList = calculateFoodCount();
        var temp = [];

        foods.map((food) => {
            food.count = 0;
            countedFoodList.map((row) => {
                if (row.id == food._id) {
                    food.count = row.count;
                }
            })
            temp.push(food);
        })

        setFoodResult(temp);
    }

    useEffect(() => {
        calculateFoodStatistics();
    }, [ orders, foods ]);

    useEffect(() => {
        setOrderFilters({ 'startDate': startDate, 'endDate': endDate });
    }, [startDate, endDate]);

    return (
        <div className="page">

            <div className="container">
                <h1 className="title">Food Statistics</h1>

                <nav>

                    <Link to={`/`}>
                        Back
                    </Link>

                </nav>


                <div className="content">
                    
                    {/* <div className="filters">
                        <FoodFilter foods={foods} foodChanged={foodChanged} />
                    </div> */}

                    <div className="block">
                        <DateFilter dateChanged={dateChanged} />
                    </div>

                    <FoodResult foods={foodResult} />

                </div>

            </div>

        </div>
    )
}

const FoodResult = ({ foods }) => {
    const list = foods.map((food, key) => {
        return (
            <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.count}</td>
                <td>0</td>
            </tr>
        )
    })

    return (
        <div className="food-result">
            <table className="table">
                <thead>
                    <tr>
                        <th>Food</th>
                        <th>Sales Count</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                        {list}
                </tbody>
            </table>
        </div>
    )
}

const FoodFilter = ({ foods, foodChanged }) => {
    const foodNames = foods.map((item, key) => {
        return <option value={item._id} key={key}>{item.name}</option>
    })

    const handleChange = (e) => {
        const id = e.target.value;

        var food = false;
        foods.map((item) => {
            if (item._id == id) {
                food = item;
            }
        });

        if (food) {
            foodChanged(food);
        }
    }

    return (
        <select onChange={handleChange}>
            {foodNames}
        </select>
    )
}

export default FoodStats;