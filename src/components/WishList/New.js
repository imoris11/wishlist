import React, { useState, useEffect } from 'react'
import { FaGift } from 'react-icons/fa';
import { Item } from '../MyWishList'
import { Nav } from '../Navigation';
import { inject } from 'mobx-react';
import { database, auth } from '../../helpers/Firebase';
import { Icon } from '../../helpers/Icon';

 const NewList = (props) => {
     let { store } = props;
     const [state, setState ] = useState({});
     const [items, setItems ] = useState([]);
     const key = props.match.params.id;

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
            paystack: store.paystack,
            uid: user.uid,
            items:items,
            displayName: user.displayName,
            profilePicture: user.photoURL,
            createdAt: Date.now()
        }
        if (key) {
            database.ref().child('wishlists').child(key).update(data);
            data['key'] = key;
            store.updateWishlist(key, data);
            addActivity(user, `updated ${state.title}`, key);
        }else{
            const key = database.ref().child('wishlists').push(data).key;
            data['key'] = key;
            store.addWishlist(data);
            addActivity(user, `created a new wishlist, ${state.title}`, key);
        }
    }

    const addActivity = (user, message, key ) => {
        const data = {
            wishListKey: key,
            profilePicture: user.photoURL,
            displayName: user.displayName,
            createdAt: Date.now(),
            uid: user.uid,
            action: message
        }
        database.ref().child('activities').push(data);
    }
    const addItem = () => {
        //Validate item
        if ( !state.name || !state.price || !state.link || !state.image || isNaN(Number(state.price))) {
            let temp = {...state};
            temp['error'] = 'All fields are required, and price must be a number';
            setState(temp);
        }else{
            console.log(Number(state.price))
            //Create a new item object
            let item = {
                name: state.name,
                price: Number(state.price),
                productUrl: state.link,
                image: state.image
            }
            //Add item to items list
            let temp_items = [...items]
            temp_items.push(item);
            setItems(temp_items);
            
            //Reset state details to empty
            let temp = {...state};
            temp.name = '';
            temp.price = '';
            temp.link = '';
            temp.image = '';
            temp.error = ''
            setState(temp);
        }
        
  
    }

    const onEdit = ( item ) => {
        const obj = {
            ...state,
            ...item,
            link: item.productUrl
        }
        setState(obj);
        const itms = items.filter((it) => it.name !== item.name);
        setItems(itms);
    }

    const handleDelete = ( item ) => {
        const temp_items = items.filter((it) => it.name !== item.name);
        setItems(temp_items);
    }

    const getWishlist = (key) => {
        database.ref().child('wishlists').child(key).once('value', snapshot => {
            if (snapshot.exists()) {
                let wishlist = {
                    ...state,
                    title:snapshot.val().title
                };
                setState(wishlist);
                setItems(snapshot.val().items);
            }
        });
    }
    useEffect(() => {
        if (key) {
            getWishlist(key);
        }
    }, [state, props.match.params.id]);

    const deleteList = () => {
        store.removeItem(key);
        database.ref().child('wishlists').child(key).remove();
        window.location.href='/home';
    }

    return (
        <>
            <Nav title='New Wishlist' />
            <Icon />
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
                                    <Item onEdit={onEdit} onDelete={handleDelete}  key={idx} item={item} />
                                )}
                                
                                <div className='form-group'>
                                    <input value={state.name} type="text" placeholder='Item name' name="name" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input type="number" value={state.price} type="text" placeholder='Price' name="price" onChange={handleChange} />
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
                                {state.error && <p className='text-center info text-danger'> {state.error} </p> }
                                {items.length > 0 && <div className='pull-right'>
                                    {key ?  <button type='submit' className='btn btn-success'> Update Wishlist</button> :
                                    <button type='submit' className='btn btn-primary'>Create Wishlist</button> }
                                </div> }
                            </form>
                    </div>
               </div>
               {key && <div className='text-center' style={{marginBottom:30}}>
                <button onClick={deleteList} className='btn btn-solid-danger'>DELETE</button>
            </div>}
        </>
       
    )
}
export default inject('store')(NewList);