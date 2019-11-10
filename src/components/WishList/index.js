import React, { useState, useEffect } from 'react';
import './WishList.css';
import { Link } from 'react-router-dom';
import { Nav } from '../Navigation';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { database } from '../../helpers/Firebase';
import loadingGif from '../../assets/images/loading.gif';
import { Share } from '../../helpers/Share';
import { Icon } from '../../helpers/Icon';

const WishList =  ( props ) => {
    const [list, setList] = useState({items:[]});
    const [ loading, setLoading ] = useState(true);
    const key = props.match.params.id;
    const getWishList = () => {
        database.ref().child('wishlists').child(key).once('value', snapshot => {
            if (snapshot.exists()) {
                setList({...snapshot.val(), key: snapshot.key });
                setLoading(false);
            }else{
                setLoading(false);
            }
        });
    }
    useEffect(() => {
        getWishList()
    }, list)
    if (loading) 
        return (
            <div className='text-center'>
                <Nav title="Wishlist" />
                <img src={loadingGif} alt="Loading icon" />
            </div>
        )
    if (!loading && list.items.length === 0 )
    return (
        <div className='text-center'>
            <h3>Wish list no longer exists :(</h3>
            <Link to='/home'> Go Home </Link>
        </div>
    )

    return (
        <div>
            <Nav title="Wishlist" />
            <Icon />
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
                        <Item paystack={list.paystack} item={item} key={list.key} /> 
                    )}
                    
                </div>
                <Share link={`https://wishlist-b5d9c.web.app/public/wishlist/${list.key}`}  />
            </div>
        </div>
    )
}

export const Item = ({ paystack, item }) => {
    return (
        <div className='items-container'>
            <div className='card-item'>
                <div className='container'>
                    <div style={{backgroundImage: `url(${item.image})`, height:30, width:30, borderRadius:5, backgroundSize: 'cover', marginRight:10}} ></div>
                    <p className='item-name'> {item.name} </p>
                </div>
                <p className='item-price'>&#8358; {item.price}</p>
                <div className='container'>
                <a target="_blank" href={item.productUrl} className='btn btn-primary btn-rounded'>Buy</a>
                {paystack &&<a target="_blank" href={paystack} className='btn btn-info'>Pay</a> }
            </div>
            </div>
        
        </div> 
    )
}

export default inject('store')(observer(WishList))