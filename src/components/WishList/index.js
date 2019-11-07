import React, { useState, useEffect } from 'react';
import './WishList.css';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from '../Navigation';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { database } from '../../helpers/Firebase';

const WishList =  ( props ) => {
    const [list, setList] = useState({items:[]});
    const key = props.match.params.id;
    const getWishList = () => {
        database.ref().child('wishlists').child(key).once('value', snapshot => {
            if (snapshot.exists()) {
                setList({...snapshot.val(), key: snapshot.key });
            }
        });
    }
    useEffect(() => {
        getWishList()
    }, list)
    return (
        <div>
            <Nav title="Wishlist" />
            <div style={{marginLeft:40}}  className='card-header'>
                <div style={{backgroundImage: `url(${list.profilePicture})`, height:30, width:30, borderRadius:15, backgroundSize: 'cover', marginTop:20}} ></div>
                <div className='user-info'>
                    <p className='username' > {list.displayName} </p>
                    <p className='time'>{moment(list.createdAt).format('LL')}</p>
                </div>
            </div>
            <div className='card'>
                <div >
                    <h5> {list.title} </h5>
                    {list.items.map((item) =>
                        <Item title={list.title} item={item} key={list.key} /> 
                    )}
                    
                </div>
                <div className='card-footer'>
                    <Link to='/'> <p className='btn btn-default'>Share List</p> </Link>
                </div>
            </div>
        </div>
    )
}

export const Item = ({ item }) => {
    return (
        <div className='items-container'>
            <div className='card-item'>
                <div className='container'>
                    <div style={{backgroundImage: `url(${item.image})`, height:30, width:30, borderRadius:5, backgroundSize: 'cover', marginRight:10}} ></div>
                    <p className='item-name'> {item.name} </p>
                </div>
                <p className='item-price'>&#8358; {item.price}</p>
                <div className='container'>
                <p className='btn btn-primary btn-rounded'>Buy</p>
                <p className='btn btn-info'>Pay</p>
            </div>
            </div>
        
        </div> 
    )
}

export default inject('store')(observer(WishList))