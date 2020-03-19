import React from 'react';

const Show = (props) => {
    return (
        <li className="tareitaB">
           
            <h4>{props.titulo}</h4>
            <small>{props.author}</small>
        </li>
    );
}

export default Show;