import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import ReactTags from 'react-tag-autocomplete';

import URLS from '../../../api/urls';

const MenuEditForm = (data) => {
    let history = useHistory();

    const default_perpage = 500;
    const menuId = data.match.params.menuId;
    const [name, setName] = useState('');
    const [status, setStatus] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [perpage, setPerpage] = useState(default_perpage);
    const [menu, setMenu] = useState({ foods: [] });
    const [foodList, setFoodList] = useState([]);
    const [foodSuggestion, setFoodSuggestion] = useState([]);
    const reactTags = React.createRef();

    const handleName = (e) => {
        setName(e.target.value);
    }

    const onStatusChanged = (e) => {
        setStatus(e.target.checked);
    };

    /**
     * Event : food is removed from the list
     */
    const onDelete = (i) => {
        const temp = foodList.slice(0);
        const out = temp.splice(i, 1);

        // add the tag again back to suggestion pool/array
        if (out.length) {
            foodSuggestion.push(out[0]);
            setFoodSuggestion(foodSuggestion);
        }

        setFoodList(temp);
    }

    /**
     * Event : food is added to the list
     */
    const onAddition = (tag) => {
        const temp = [].concat(foodList, tag);

        // remove from suggestion list
        var removeIndex = -1;
        for (var i=0; i<foodSuggestion.length; i++) {
            if (foodSuggestion[i].id === tag.id) {
                removeIndex = i;
                break;
            }
        }
        if (removeIndex >= 0) {
            foodSuggestion.splice(removeIndex, 1);
            setFoodSuggestion(foodSuggestion);
        }

        setFoodList(temp);
    }

    const prepareFoodSuggestion = () => {
        const url = URLS.base_url + URLS.food.base + '?perpage=' + perpage + '&page=' + page + '&search=' + search;
        
        axios.get(url)
            .then((res) => {
                var temp = [];
                // loop list of all foods
                for (var i=0; i<res.data.foods.length; i++) {
                    var item = res.data.foods[i];
                    // loop on list of foods on current menu
                    var match = false;
                    for (var j=0; j<foodList.length; j++) {
                        if (foodList[j].id == item._id) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) {
                        temp.push({
                            'id': item._id,
                            'name': item.name
                        });
                    }
                }
                setFoodSuggestion(temp);
            })
            .catch((error) => {
                setFoodSuggestion([]);
            });
    }

    const getMenu = () => {
        const url = URLS.base_url + URLS.menu.list + '/' + menuId;

        axios.get(url)
            .then((res) => {
                setMenu(res.data.menu);
                setName(res.data.menu.name);
                setStatus(res.data.menu.status);
                var temp = [];
                for (var i = 0; i < res.data.menu.foods.length; i++) {
                    temp.push({
                        'id': res.data.menu.foods[i]._id,
                        'name': res.data.menu.foods[i].name
                    });
                }
                setFoodList(temp);
            })
            .catch((error) => {
                // 
            });
    }

    const update = () => {
        var ids = [];
        for (var i=0; i<foodList.length; i++) {
            ids.push(foodList[i].id);
        }
        
        var data = {
            name: name,
            status: status,
            foods: ids
        };

        const url = URLS.base_url + URLS.menu.base;

        axios.put(`${url}/${menuId}/update`, data)
        .then((res) => {
            // redirect
            history.push(`/menu/${menuId}/view`);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        update();
    }

    useEffect(() => {
        getMenu();
    }, []);

    useEffect(() => {
        prepareFoodSuggestion();
    }, [ foodList ]);

    return (
        <div className="container">
            <h1>Edit Form : {menu.name}</h1>

            <nav>
                <Link to={`/menu/${menuId}/view`}>
                    Back
                </Link>
            </nav>

            <div className="content">
                <form onSubmit={handleSubmit}>

                    <div className="form-item">
                        <input type="text" placeholder="name" value={name} onChange={handleName}/>
                    </div>

                    <div className="form-item">
                        <input type="checkbox" id="cb-status" name="cb-status" checked={status}  onChange={onStatusChanged} />
                        <label htmlFor="cb-status">Status</label>
                    </div>

                    <div className="form-item">
                        <label htmlFor="">Foods</label>
                        <ReactTags
                            placeholderText="Add Attribute..."
                            ref={reactTags}
                            tags={foodList}
                            suggestions={foodSuggestion}
                            onDelete={onDelete}
                            onAddition={onAddition} />
                    </div>

                    <div className="form-item">
                        <button onSubmit={handleSubmit}>Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default MenuEditForm;