import React from 'react';

import Menu from './menu/Menu';

const MenuList = ({ data }) => {
    const list = data.map((item, key) => {
        return <Menu data={item} key={key} />
    })
    return (
        <div>
            {list}
        </div>
    )
}

export default  MenuList;