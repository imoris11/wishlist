import React from 'react';
import './WishList.css';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';


export const Item = ({ item, onEdit, onDelete }) => {
    return (
        <div className='items-container'>
            <div className='card-item'>
                <div className='container'>
                    <div style={{backgroundImage: `url(${item.image})`, height:30, width:30, borderRadius:5, backgroundSize: 'cover', marginRight:10}} ></div>
                    <p className='item-name'> {item.name} </p>
                </div>
                <p className='item-price'>&#8358; {item.price}</p>
                <div className='container'>
                <p className='btn btn-default' onClick={() => onEdit(item)}><FaPencilAlt /></p>
                <p className='btn btn-danger' onClick={() => onDelete(item)}><FaTrash /></p>
            </div>
            </div>
        
        </div> 
    )
}
