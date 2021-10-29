import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTags from 'react-tag-autocomplete';

import URLS from '../../../api/urls';

const OrderForm = () => {

    const default_perpage = 500;
    const [foodList, setFoodList] = useState([]);
    const [foodSuggestion, setFoodSuggestion] = useState([]);
    const [status, setStatus] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [perpage, setPerpage] = useState(default_perpage);
    const [table, setTable] = useState('');
    const reactTags = React.createRef();

    const tempFoodRows = [
        {
            'id': '6174cc3e8181a404f17915f9',
            'name': 'Veg Momo',
            'quantity': 2,
            'pricePerItem': 100,
            'total': 200
        },
        {
            'id': '6174d6e58181a404f1791601',
            'name': 'Chicken Momo',
            'quantity': 1,
            'pricePerItem': 130,
            'total': 130
        }
    ];

    const [foodRowsData, setFoodRowsData] = useState(tempFoodRows);
    
    const handleTable = (e) => {
        setTable(e.target.value);
    }

    const handleStatus = (e) => {
        setStatus(e.target.checked);
    }

    const addFood = (data) => {
        var food = false;
        for (var i=0; i<foodList.length; i++) {
            var item = foodList[i];
            if (item._id == data.id) {
                food = {
                    'id': item._id,
                    'name': item.name,
                    'quantity': data.quantity,
                    'pricePerItem': item.price,
                    'total': data.quantity * item.price
                }
            }
        }
        if (food) {
            setFoodRowsData([...foodRowsData, food]);
        }
    }

    const removeFood = (data) => {
        console.log(data);
        var temp = [];
        for (var i=0; i<foodRowsData.length; i++) {
            var item = foodRowsData[i];
            if (item.id == data.id)
                continue;
            temp.push(item);
        }
        setFoodRowsData(temp);
    }

    const getFoods = () => {
        const url = URLS.base_url + URLS.food.base + '?perpage=' + perpage + '&page=' + page + '&search=' + search;
        
        axios.get(url)
            .then((res) => {
                setFoodList(res.data.foods);

                var temp = [];
                for (var i=0; i<res.data.foods.length; i++) {
                    temp.push({
                        'id': res.data.foods[i]._id,
                        'name': res.data.foods[i].name
                    });
                }
                setFoodSuggestion(temp);
            })
            .catch((error) => {
                setFoodSuggestion([]);
            });
    }

    const save = () => {
        // save code
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        save();
    }

    useEffect(() => {
        getFoods();
    }, [])

    return (
        <div className="container">
            <h1>Create Order</h1>

            <nav>
                <Link to={`/order/manage`}>
                    Back
                </Link>
            </nav>

            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="txt-table">Table</label>
                    <input type="text" id="txt-table" value={table} onChange={handleTable}/>
                </div>

                <div className="form-item">
                    <label htmlFor="cb-status">Status</label>
                    <input type="checkbox" id="cb-status" value={status} onChange={handleStatus}/>
                </div>

                <FoodSelector data={foodRowsData} suggestion={foodSuggestion} addFood={addFood} removeFood={removeFood} />

                <button onClick={handleSubmit}>Save</button>
            </form>
        </div>
    )
}

/**
 * Component : allow user to add food to this order with quantity
 */
const FoodSelector = ({ data, suggestion, addFood, removeFood }) => {
    const [currentFood, setCurrentFood] = useState('');
    const [quantity, setQuantity] = useState(1);

    const options = suggestion.map((item, key) => {
        return <option value={item.id} key={key}>{item.name}</option>
    });

    const handleFoodChange = (e) => {
        setCurrentFood(e.target.value);
    }

    const handleQuantity = (e) => {
        var value = parseInt(e.target.value);
        setQuantity(value);
    }

    const handleAddFood = (e) => {
        // 
        var food = {
            'id': currentFood,
            'quantity': quantity,
        };
        addFood(food);
    }

    return (
        <React.Fragment>
            <div className="form-item">
                <select value={currentFood} onChange={handleFoodChange}>
                    <option value="">None</option>
                    {options}
                </select>
                <input type="number " value={quantity} onChange={handleQuantity}/>
                <button onClick={handleAddFood}>Add Food</button>
            </div>
            <div className="form-item">
                <FoodRows data={data} suggestion={suggestion} removeFood={removeFood} />
            </div>
        </React.Fragment>
    )
}

const FoodRows = ({ data, suggestion, removeFood }) => {
    const rows = data.map((item, key) => {
        return <FoodRow data={item} suggestion={suggestion} removeFood={removeFood} key={key} />
    });

    return (
        <div>
            {data.length ? (
                <div>
                    {rows}
                </div>
            ) : (
                <p>Please add some food.</p>
            )}
        </div>
    )
};

const FoodRow = ({ data, suggestion, removeFood }) => {
    const options = suggestion.map((item, key) => {
        return <option value={item.value} key={key}>{item.name}</option>
    });

    const handleClose = (e) => {
        e.preventDefault();

        removeFood(data);
    };
    
    return (
        <div className="food-row">
            <h3>{data.name}</h3>
            <div className="btn-close" onClick={handleClose}>Close</div>
            <div className="content">
                <div className="price">
                    <p>Price: Rs. {data.pricePerItem}</p>
                </div>
                <div className="totaling">
                    <p>Qty. {data.quantity}</p>
                    <p>Total: Rs. {data.total}</p>
                </div>
            </div>
        </div>
    )
};

export default OrderForm;