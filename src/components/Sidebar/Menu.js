import React from 'react';
import { FaGift } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Menu.css';

export const Menu = (props) => {
    const profile = require('../../assets/images/login.jpg');
    return (
        <div className='shadow' >
            <Link to='/profile' className='profile-container'>
                <div style={{backgroundImage: `url(${profile})`, height:40, width:40, borderRadius:20, backgroundSize: 'cover', marginTop:20}} ></div>
                <h4 className='username' style={{marginTop:30}}> Richard Igbiriki </h4>
            </Link>
            <div className='center new-wishlist'>
                 
                 <Link className='btn btn-success btn-rounded' to='/wishlist/new'>
                   Create a wishlist
                 </Link>  
            </div>
           <div className='section'>
               <p className='section-header'>My Wishlists</p>
           </div>
           <ul>
               <li>
                   <Link to='/mywishlist' className='list-item'> Item One <span className='gift-items'>10  <FaGift /> </span>  </Link> 
                </li>
                <li>
                   <Link to='/mywishlist' className='list-item'> Item One <span className='gift-items'>10  <FaGift /> </span>  </Link> 
                </li>
                <li>
                   <Link to='/mywishlist' className='list-item'> Item One <span className='gift-items'>10  <FaGift /> </span>  </Link> 
                </li>
           </ul>
           <div className='section'>
               <p className='section-header'>Shared with Me</p>
           </div>
           <ul>
           <li>
                   <Link to='/mywishlist' className='list-item'> Item One <span className='gift-items'>10  <FaGift /> </span>  </Link> 
                </li>
                <li>
                   <Link to='/mywishlist' className='list-item'> Item One <span className='gift-items'>10  <FaGift /> </span>  </Link> 
                </li>
           </ul>
        </div>
    )
}