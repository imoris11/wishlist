import React, { useState } from 'react'
import { FaGift } from 'react-icons/fa';
import { Item } from '../MyWishList'
import { Nav } from '../Navigation';
import { inject } from 'mobx-react';
import { database, auth } from '../../helpers/Firebase';

 const NewList = (props) => {
     let { store } = props;
     const [state, setState ] = useState({});
     const [items, setItems ] = useState([]);
    

    const handleChange = (e) => {
        let temp = {...state};
        temp[e.target.name] = e.target.value;
        setState(temp);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        saveItems();

        let temp = {...state};
        temp.title = '';
        setState(temp);
        setItems([])
    }

    const saveItems = () => {
        const user = auth.currentUser
        const data = {
            title:state.title,
            uid: user.uid,
            items:items,
            displayName: user.displayName,
            profilePicture: user.photoURL,
            createdAt: Date.now()
        }
        const key = database.ref().child('wishlists').push(data).key
        data['key'] = key
        store.addWishlist(data);
    }

    const addItem = () => {
        let item = {
            name: state.name,
            price: Number(state.price),
            productUrl: state.link,
            image: state.image
        }
        
        let temp_items = [...items]
        temp_items.push(item);
        setItems(temp_items);
        

        let temp = {...state};
        temp.name = '';
        temp.price = '';
        temp.link = '';
        temp.image = '';
        setState(temp);
    }
    return (
        <>
            <Nav title='New Wishlist' />
            <div className='card'>
                    <div >
                                                                                                                                                                                                                                                                                                                               <h3  style={{textAlign:'center'}}>Make a Wish <FaGift className='primary icon' /> </h3>
                            <form onSubmit={handleSubmit} className='wishlist-form' >
                                <div className='form-group'>
                                    <input value={state.title} type="text" placeholder='Wishlist title' name="title" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>
                                <h5>Items</h5>
                                {items.map((item, idx) =>
                                    <Item title='Items' key={idx} item={item} />
                                )}
                                
                                <div className='form-group'>
                                    <input value={state.name} type="text" placeholder='Item name' name="name" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input value={state.price} type="text" placeholder='Price' name="price" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input value={state.link} type="text" placeholder='Product link' name="link" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input value={state.image} type="text" placeholder='Image link' name="image" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                       
                                <div className='actions'> 
                                    <p style={{cursor:'pointer'}} onClick={addItem} className='btn btn-info'>Add Item</p>
                                </div>
                                <div className='pull-right'>
                                    <button type='submit' className='btn btn-primary'>Create Wishlist</button>
                                </div>
                            </form>
                    </div>
               </div>
        </>
       
    )
}
export default inject('store')(NewList);