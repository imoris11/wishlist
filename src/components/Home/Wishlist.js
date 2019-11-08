
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import loadingGif from '../../assets/images/loading.gif';
import { Share } from '../../helpers/Share';

const Wishlist = (props) => {
    const { store } = props;

    if (store.loading) 
        return (
            <div className='text-center'>
               <h4 style={{marginLeft:20}}>Recent Wishlists</h4>
                <img src={loadingGif} alt="Loading icon" />
            </div>
        )

    if ( store.noWishes ) 
        return (
            <div className='text-center'>
                <h4 style={{marginLeft:20}}>Recent Wishlists</h4>
                <p className='text-info'> No Wishlists </p>
            </div>
        )

    return (
        <div >
            <h4 style={{marginLeft:20}}>Recent Wishlists</h4>
            {store.recentLists.map((list) =>
                <List list={list} key={list.key} />
            )}
                    
        </div>
    )
}

const List = ({ list }) => {
    const shareList = ()=> {
        
    }
    return (
<div>
			<div>
				{toggle && (
					<div className="absolute">
						<Menu />
						<div className="sidebar-control" onClick={handleIconClick}>
							<div className="sidebar-control-icon">&#9747;</div>
						</div>
					</div>
				)}
				{!toggle && (
					<div className="sidebar-control" onClick={handleIconClick}>
						<div className="sidebar-control-icon">&#9776;</div>
					</div>
				)}

        <div className='card'>
            <div className='card-header'>
                <div style={{backgroundImage: `url(${list.profilePicture})`, height:30, width:30, borderRadius:15, backgroundSize: 'cover', marginTop:20}} ></div>
                <div className='user-info'>
                    <p className='username' > {list.displayName} </p>
                    <p className='time'>{moment(list.createdAt).format('LL')}</p>
                </div>
            </div>
            <div className='card-body'>
                <div>
                    <h5>{list.title}</h5>
                   
                        {list.items.map((item, idx) => 
                            <Item item={item} key={idx} />
                        )}
                </div>
            </div>
            <div className='card-footer'>
                <Link to={`/wishlists/${list.key}`}> <p className='btn btn-default'>View Full List</p> </Link>
                <Share link={`https://wishlist-b5d9c.web.app/public/wishlist/${list.key}`}  />
            </div>
        </div>

</div>
    )
}

const Item = ({ item }) => {
    return (
        <div className='card-item'>
            <p className='item-name'> {item.name} </p>
            <p className='item-price' style={{marginLeft:40}}>	&#8358;{item.price}</p>
        </div>
    )
}

export default inject('store')(observer(Wishlist));
