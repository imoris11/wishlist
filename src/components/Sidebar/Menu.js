import React from 'react';
import { FaGift } from 'react-icons/fa';
import './Menu.css';

export const Menu = (props) => {
    const profile = require('../../assets/images/login.jpg');
    return (
        <div className='shadow' >
            <div className='profile-container'>
                <div style={{backgroundImage: `url(${profile})`, height:40, width:40, borderRadius:20, backgroundSize: 'cover', marginTop:20}} ></div>
                <h4 className='username' style={{marginTop:30}}> Richard Igbiriki </h4>
            </div>
            <div className='center new-wishlist'>
                 <button className='btn btn-success btn-rounded'> Create a wishlist </button>
            </div>
           <div className='section'>
               <p className='section-header'>My Wishlists</p>
           </div>
           <ul>
               <li className='list-item'>Item One <span className='gift-items'>10  <FaGift /> </span> </li>
               <li className='list-item'>Item Two <span className='gift-items'>10  <FaGift /> </span> </li>
               <li className='list-item'>Item Three <span className='gift-items'>11  <FaGift /> </span> </li>
               <li className='list-item'>Item Four <span className='gift-items'>112  <FaGift /> </span> </li>
               <li className='list-item'>Item Three <span className='gift-items'>11  <FaGift /> </span> </li>
               <li className='list-item'>Item Four <span className='gift-items'>112  <FaGift /> </span> </li>
           </ul>
           <div className='section'>
               <p className='section-header'>Shared with Me</p>
           </div>
           <ul>
               <li className='list-item'>Item One <span className='gift-items'>10  <FaGift /> </span> </li>
               <li className='list-item'>Item Two <span className='gift-items'>10  <FaGift /> </span> </li>
               <li className='list-item'>Item Three <span className='gift-items'>10  <FaGift /> </span> </li>
               <li className='list-item'>Item Four <span className='gift-items'>10  <FaGift /> </span> </li>
           </ul>
        </div>
    )
}