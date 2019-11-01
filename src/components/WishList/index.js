import React from 'react';
import './WishList.css';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from '../Navigation';
export const WishList = (props) => {
    const profile = require('../../assets/images/login.jpg');
    return (
        <div>
            <Nav title="Wishlist" />
            <div style={{marginLeft:40}}  className='card-header'>
                <div style={{backgroundImage: `url(${profile})`, height:30, width:30, borderRadius:15, backgroundSize: 'cover', marginTop:20}} ></div>
                <div className='user-info'>
                    <p className='username' > Richard Igbiriki </p>
                    <p className='time'>June 19, 2019</p>
                </div>
            </div>
            <div className='card'>
                <div className='card-body'>
                    <Item /> 
                </div>
                <div className='card-footer'>
                    <div className='likes-container' >
                        <FaHeart />
                        <span className='likes'>21</span>
                    </div>
                    <Link to='/'> <p className='btn btn-default'>Share List</p> </Link>
                </div>
            </div>
        </div>
    )
}

export const Item = (props) => {
    const profile = require('../../assets/images/login.jpg');
    return (
        <div className='items-container'>
            <h5>Birthday Gift Suggestions</h5>
            <div className='card-item'>
                <div className='container'>
                    <div style={{backgroundImage: `url(${profile})`, height:30, width:30, borderRadius:5, backgroundSize: 'cover', marginRight:10}} ></div>
                    <p className='item-name'> Nike Shoes </p>
                </div>
                <p className='item-price'>NGN1,200</p>
                <div className='container'>
                <p className='btn btn-primary btn-rounded'>Buy</p>
                <p className='btn btn-info'>Pay</p>
            </div>
            </div>
        
        </div> 
    )
}