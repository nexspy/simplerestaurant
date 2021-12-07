import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import URLS from '../../../api/urls';

const FoodForm = (data) => {
    let history = useHistory();
    
    const foodId = data.match.params.foodId;
    const [food, setFood] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [price, setPrice] = useState(100);
    const [isVegeterian, setIsVegeterian] = useState(false);
    const [status, setStatus] = useState(true);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleSubCategory = (e) => {
        setSubCategory(e.target.value);
    };

    const handlePrice = (e) => {
        var value = e.target.value;
        if (value < 1) {
            value = 1;
        }
        setPrice(value);
    };

    const onStatusChanged = (e) => {
        setStatus(e.target.checked);
    };

    const onVegeterianChange = (e) => {
        setIsVegeterian(e.target.checked);
    };

    const getFood = () => {
        const url = URLS.base_url + URLS.food.base + '/' + foodId + '/detail';
        
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    setFood(res.data.food);
                    setName(res.data.food.name);
                    setDescription(res.data.food.description);
                    setCategory(res.data.food.category);
                    setSubCategory(res.data.food.subCategory);
                    setPrice(res.data.food.price);
                    setIsVegeterian(res.data.food.veg);
                    setStatus(res.data.food.status);
                }
            })
            .catch((error) => {
                //
            });
    }

    const saveFood = () => {
        var data = {
            "name": name,
            "description": description,
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

    const updateFood = () => {
        const url = URLS.base_url + URLS.food.base + '/' + foodId + '/update';
        var data = {
            'name': name,
            'description': description,
            'category': category,
            'subCategory': subCategory,
            'price': price,
            'veg': isVegeterian,
            'status': status
        };

        axios.put(url, data)
            .then((res) => {
                // redirect
                history.push('/food/manage');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (typeof foodId !== 'undefined') {
            updateFood();
        } else {
            saveFood();
        }
        
    }

    useEffect(() => {
        if (typeof foodId !== 'undefined') {
            getFood();
        }
    }, []);

    return (
        <div className="page container">

            {foodId ? (
                <h1>Edit Food Item</h1>
            ) : (
                <h1>Create Food Item</h1>
            )}

            <nav>
                <Link to={`/food/manage`}>
                    Back
                </Link>
            </nav>

            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="txt-name">Name</label>
                    <input id="txt-name" type="text" placeholder="name" value={name} onChange={handleName} />
                </div>
                <div className="form-item">
                    <label htmlFor="txt-description">Description</label>
                    <textarea id="txt-description" placeholder="description" value={description} onChange={handleDescription}>
                    </textarea>
                </div>
                <div className="form-item">
                    <label htmlFor="txt-category">Category</label>
                    <input id="txt-category" type="text" placeholder="category" value={category} onChange={handleCategory} />
                </div>
                <div className="form-item">
                    <label htmlFor="txt-subcategory">Sub Category</label>
                    <input id="txt-subcategory" type="text" placeholder="subcategory" value={subCategory} onChange={handleSubCategory} />
                </div>
                <div className="form-item">
                    <label htmlFor="txt-price">Price</label>
                    <input id="txt-price" type="number" placeholder="price" value={price} onChange={handlePrice} />
                </div>
                <div className="form-item form-checkbox">
                    <label htmlFor="cb-vegeterian">Is Vegeterian</label>
                    <input type="checkbox" id="cb-vegeterian" name="cb-vegeterian" checked={isVegeterian}  onChange={onVegeterianChange} />
                </div>
                <div className="form-item form-checkbox">
                    <label htmlFor="cb-status">Status</label>
                    <input type="checkbox" id="cb-status" name="cb-status" checked={status}  onChange={onStatusChanged} />
                </div>
                <div className="form-item">
                    <button className="" name="btn-create" onClick={handleSubmit}>Create Product</button>
                </div>
            </form>
        </div>
    )
}

export default FoodForm;