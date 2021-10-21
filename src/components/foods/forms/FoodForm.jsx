import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import URLS from '../../../api/urls';

const FoodForm = () => {
    let history = useHistory();
    
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [isVegeterian, setIsVegeterian] = useState(false);
    const [status, setStatus] = useState(true);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleSubCategory = (e) => {
        setSubCategory(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const onStatusChanged = (e) => {
        setStatus(e.target.checked);
    };

    const onVegeterianChange = (e) => {
        setIsVegeterian(e.target.checked);
    };

    const saveFood = () => {
        var data = {
            "name": name,
            "category": category,
            "subCategory": subCategory,
            "price": price,
            "veg": isVegeterian,
            "status": status
        };
        
        const url = URLS.base_url + URLS.food.create;

        axios.post(url, data)
            .then((res) => {
                // const foodId = res.data.food['_id'];
                
                // redirect
                history.push('/food/manage');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('name : ' + name);

        saveFood();
    }

    return (
        <div className="page container">

            <h1>Create Food Item</h1>

            <nav>
                <Link to={`/food/manage`}>
                    Back
                </Link>
            </nav>

            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <input type="text" placeholder="name" value={name} onChange={handleName} />
                </div>
                <div className="form-item">
                    <input type="text" placeholder="category" value={category} onChange={handleCategory} />
                </div>
                <div className="form-item">
                    <input type="text" placeholder="subcategory" value={subCategory} onChange={handleSubCategory} />
                </div>
                <div className="form-item">
                    <input type="text" placeholder="price" value={price} onChange={handlePrice} />
                </div>
                <div className="form-item">
                    <input type="checkbox" id="cb-vegeterian" name="cb-vegeterian" checked={isVegeterian}  onChange={onVegeterianChange} />
                    <label htmlFor="cb-vegeterian">Is Vegeterian</label>
                </div>
                <div className="form-item">
                    <input type="checkbox" id="cb-status" name="cb-status" checked={status}  onChange={onStatusChanged} />
                    <label htmlFor="cb-status">Status</label>
                </div>
                <div className="form-item">
                    <button className="" name="btn-create" onClick={handleSubmit}>Create Product</button>
                </div>
            </form>
        </div>
    )
}

export default FoodForm;