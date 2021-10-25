import React from 'react';

const MenuSuggestion = ({ data }) => {
    const menus = data.map((item, key) => {
        return <option value={item._id} key={key}>{item.name}</option>
    })
    return (
        <select>
            {menus}
        </select>
    )
}

export default MenuSuggestion;