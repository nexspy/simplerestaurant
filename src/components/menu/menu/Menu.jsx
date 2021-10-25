import React from 'react';
import { useHistory } from 'react-router-dom';

const Menu = ({ data }) => {
    let history = useHistory();

    const handleClick = () => {
        var id = data._id;
        history.push("/menu/" + id + "/view");
    }

    const menuStatus = (data.status ? 
        <React.Fragment>active</React.Fragment>
        : <React.Fragment>inactive</React.Fragment>);

    return (
        <div className="menu-item" onClick={handleClick}>
            <h3>{data.name} <span>{menuStatus}</span></h3>
        </div>
    )
}

export default Menu;