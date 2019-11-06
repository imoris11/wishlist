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
        store.addWishlist(state.title, items);
        saveItems();

        let temp = {...state};
        temp.title = '';
        setState(temp);
        setItems([])
    }

    const saveItems = () => {
        const total = items.reduce((a, b) => a.price+b.price || 0)
        const user = auth.currentUser
        const key = database.ref().child('wishlists').push({
            title:state.title,
            number_of_items: items.length,
            price: total,
            uid: user.uid,
            displayName: user.displayName
        }).key
        items.forEach((item) => {
            database.ref().child('wishlist_items').child(key).push(item);
        })
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