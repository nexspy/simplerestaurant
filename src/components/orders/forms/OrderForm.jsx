import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import ReactTags from 'react-tag-autocomplete';

import URLS from '../../../api/urls';
import userEvent from '@testing-library/user-event';

const OrderForm = (data) => {
    let history = useHistory();
    const default_perpage = 500;
    const orderId = data.match.params.orderId;
    const [order, setOrder] = useState(false);
    const [foodList, setFoodList] = useState([]);
    const [foodSuggestion, setFoodSuggestion] = useState([]);
    const [status, setStatus] = useState(true);
    const [checkedStatus, setCheckedStatus] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [perpage, setPerpage] = useState(default_perpage);
    const [table, setTable] = useState('');
    const reactTags = React.createRef();
    const [foodRowsData, setFoodRowsData] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    
    const handleTable = (e) => {
        setTable(e.target.value);
    }

    const handleStatus = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setCheckedStatus('checked');
        } else {
            setCheckedStatus('');
        }
        setStatus(checked);
    }

    const increaseQuantity = (data) => {
        updateFoodItemQuantity(data, 1);
    }

    const decreaseQuantity = (data) => {
        updateFoodItemQuantity(data, -1);
    }

    const updateFoodItemQuantity = (data, value) => {
        // loop through all foods fetched from server
        for (var i=0; i<foodList.length; i++) {
            var item = foodList[i];

            // check if food selected is already in the foodList
            var foodAlreadyInList = false;
            var foodInRow = false;
            for (var j=0; j<foodRowsData.length; j++) {
                if (foodRowsData[j].id == data.id) {
                    foodAlreadyInList = true;
                    foodInRow = foodRowsData[j];
                }
            }

            // increate the quantity if food already in the list
            if (foodAlreadyInList && foodInRow) {
                var updatedQuantity = foodInRow.quantity + value;
                if (updatedQuantity > 0) {
                    var temp = [...foodRowsData];
                    for (var k=0; k<temp.length; k++) {
                        if (temp[k].id == foodInRow.id) {
                            temp[k].quantity = updatedQuantity;
                            if (value === 1) {
                                temp[k].total += foodInRow.pricePerItem;
                            } else {
                                temp[k].total -= foodInRow.pricePerItem;
                            }
                        }
                    }
                    setFoodRowsData(temp);
                }
                break;
            }
        }
    }

    const addFood = (data) => {
        var food = false;
        // loop through all foods fetched from server
        for (var i=0; i<foodList.length; i++) {
            var item = foodList[i];

            // check if food selected is already in the foodList
            var foodAlreadyInList = false;
            var foodInRow = false;
            for (var j=0; j<foodRowsData.length; j++) {
                if (foodRowsData[j].id == data.id) {
                    foodAlreadyInList = true;
                    foodInRow = foodRowsData[j];
                }
            }

            // increate the quantity if food already in the list
            if (foodAlreadyInList && foodInRow) {
                var updatedQuantity = foodInRow.quantity + data.quantity;
                var temp = [...foodRowsData];
                for (var k=0; k<temp.length; k++) {
                    if (temp[k].id == foodInRow.id) {
                        temp[k].quantity = updatedQuantity;
                        temp[k].total += foodInRow.pricePerItem;
                    }
                }
                setFoodRowsData(temp);
                break;
            } else {
                // add the food to list
                if (item._id == data.id) {
                    food = {
                        'id': item._id,
                        'name': item.name,
                        'quantity': data.quantity,
                        'pricePerItem': item.price,
                        'total': data.quantity * item.price
                    }
                }

                if (food) {
                    setFoodRowsData([...foodRowsData, food]);
                }
            }
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

    const getOrder = () => {
        const url = URLS.base_url;

        axios.get(url + '/orders/' + orderId + '/detail')
            .then((res) => {
                if (res.data.success) {
                    const tempOrder = res.data.order;
                    setStatus(tempOrder.status);
                    if (tempOrder.status) {
                        setCheckedStatus('checked');
                    } else {
                        setCheckedStatus('');
                    }
                    setOrder(res.data.order);
                }
            })
            .catch((error) => {
                // 
            });
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
        var data = {
            "foods": foodRowsData,
            "table": table,
            "status": status,
        }

        const url = URLS.base_url + URLS.order.create;

        axios.post(url, data)
            .then((res) => {
                // redirect
                history.push('/order/manage');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateOrder = () => {
        // save code
        var data = {
            "foods": foodRowsData,
            "table": table,
            "status": status,
        }

        const url = URLS.base_url + URLS.order.base + '/' + orderId + '/update';

        axios.put(url, data)
            .then((res) => {
                // redirect
                history.push('/order/manage');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteOrder = () => {
        const url = URLS.base_url + URLS.order.base + '/' + orderId + '/delete';

        axios.delete(url)
            .then((res) => {
                history.push('/order/manage');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (typeof orderId !== 'undefined') {
            updateOrder();
        } else {
            save();
        }
        
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        deleteOrder();
    }

    useEffect(() => {
        getFoods();
        if (typeof orderId !== 'undefined') {
            getOrder();
        }
    }, []);

    useEffect(() => {
        if (typeof order !== 'undefined') {
            if (typeof order.table !== 'undefined') {
                setTable(order.table);
            }
            if (typeof order.status !== 'undefined') {
                setStatus(order.status);    
            }
            if (typeof order.foods !== 'undefined') {
                setFoodRowsData(order.foods)
            }
        }
    }, [ order ]);

    useEffect(() => {
        console.log(foodRowsData);
        var total = 0;
        foodRowsData.map((item) => {
            total += item.total;
        });
        setGrandTotal(total);
    }, [ foodRowsData ]);

    return (
        <div className="container">

            {orderId ? (
                <h1>Edit Order</h1>
            ) : (
                <h1>Create Order</h1>
            ) }

            <nav>
                <Link to={`/order/manage`}>
                    Back
                </Link>
            </nav>

            <form onSubmit={handleSubmit}>
                <div className="form-item form-item-hidden">
                    <label htmlFor="txt-table">Table</label>
                    <input type="text" id="txt-table" value={table} onChange={handleTable}/>
                </div>

                <div className="form-item form-checkbox">
                    <label htmlFor="cb-status">Status</label>
                    <input type="checkbox" id="cb-status" checked={checkedStatus} onChange={handleStatus}/>
                </div>

                <FoodSelector data={foodRowsData} suggestion={foodSuggestion} addFood={addFood} removeFood={removeFood} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>

                <div className="form-item totaling-final">$ {grandTotal}</div>

                <button onClick={handleSubmit}>Save</button>

                {order ? (
                    <button onClick={handleDeleteSubmit}>Delete</button>
                ) : (
                    <></>
                )}
                
            </form>
        </div>
    )
}

/**
 * Component : allow user to add food to this order with quantity
 */
const FoodSelector = ({ data, suggestion, addFood, removeFood, increaseQuantity, decreaseQuantity }) => {
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
        console.log(value)
        if (value < 1 || isNaN(value)) {
            value = 1;
        }
        setQuantity(value);
    }

    const handleAddFood = (e) => {
        e.preventDefault();
        // 
        var food = {
            'id': currentFood,
            'quantity': quantity,
        };
        addFood(food);
    }

    return (
        <React.Fragment>
            <div className="form-item form-food-adder">
                <select value={currentFood} onChange={handleFoodChange}>
                    <option value="">None</option>
                    {options}
                </select>
                <input type="number " value={quantity} onChange={handleQuantity}/>
                <button onClick={handleAddFood}>Add Food</button>
            </div>
            <div className="form-item">
                <FoodRows data={data} suggestion={suggestion} removeFood={removeFood} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
            </div>
        </React.Fragment>
    )
}

const FoodRows = ({ data, suggestion, removeFood, increaseQuantity, decreaseQuantity}) => {
    const rows = data.map((item, key) => {
        return <FoodRow data={item} suggestion={suggestion} removeFood={removeFood} key={key} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
    });

    return (
        <div>
            {data.length ? (
                <div className="food-selected-rows">
                    {rows}
                </div>
            ) : (
                <p>Please add some food.</p>
            )}
        </div>
    )
};

const FoodRow = ({ data, suggestion, removeFood, increaseQuantity, decreaseQuantity }) => {
    const options = suggestion.map((item, key) => {
        return <option value={item.value} key={key}>{item.name}</option>
    });

    const handleClose = (e) => {
        e.preventDefault();

        removeFood(data);
    };

    const handleIncrease = () => {
        increaseQuantity(data);
    }

    const handleDecrease = () => {
        decreaseQuantity(data);
    }
    
    return (
        <div className="food-row">
            <h3>{data.name}</h3>
            <div className="btn-close" onClick={handleClose}>Remove</div>
            <div className="qty-actions">
                <div onClick={handleIncrease} className="qty-btn">+</div>
                <div onClick={handleDecrease} className="qty-btn">-</div>
            </div>
            <div className="content">
                <div className="price">
                    <p>Price: $ {data.pricePerItem}</p>
                </div>
                <div className="totaling">
                    <p>Qty. {data.quantity}</p>
                    <p>Total: $ {data.total}</p>
                </div>
            </div>
        </div>
    )
};

export default OrderForm;