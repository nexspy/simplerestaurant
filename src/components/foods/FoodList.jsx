import React from 'react';

import Food from './food/Food.jsx'; 

const FoodList = ({ data, foodSelected, foodEdited }) => {

    const foodlist = data.map((item,key) => {
        return <Food data={item} key={key} foodSelected={foodSelected} foodEdited={foodEdited} />
    })
    return (
        <div className="food-list boxes">
            {foodlist}
        </div>
    )
}

export default FoodList;