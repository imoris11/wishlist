import React, { useState, useEffect} from 'react';
import { FaGift } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import './Menu.css';
import { auth } from '../../helpers/Firebase';

export const Menu = (props) => {
    const [loggedIn, setLoggedIn ] = useState(true);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(user => {
        if(user) {
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
      })
      return (()=> {
          subscribe();
      })
      }, []);
      const logout = () => {
          auth.signOut()
      }
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
           <p onClick={logout} className='text-center text-danger logout'>Log Out</p>
           {!loggedIn && <Redirect to='/' /> }
        </div>
    )
}