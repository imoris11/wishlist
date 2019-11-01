import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Nav = (props) => {
    return (
        <Link to='/home' className='navigation'>
             <FaAngleLeft className='back-button' />  
            <h4 style={{marginLeft:40}}>{props.title}</h4>
        </Link>
    )
};