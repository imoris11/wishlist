import React from 'react'
import { FaGift } from 'react-icons/fa';
import { Item } from '../MyWishList'
import { Nav } from '../Navigation';
 export const NewList = (props) => {
    const handleChange = (e) => {

    }
    return (
        <>
            <Nav title='New Wishlist' />
            <div className='card'>
                    <div >
                    <h3  style={{textAlign:'center'}}>Make a Wish <FaGift className='primary icon' /> </h3>
                            <form className='wishlist-form' >
                                <div className='form-group'>
                                    <input type="text" placeholder='Wishlist title' name="title" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>
                                <Item title='Items' />

                                <div className='form-group'>
                                    <input type="text" placeholder='Item name' name="name" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input type="text" placeholder='Price' name="price" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input type="text" placeholder='Product link' name="link" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input type="text" placeholder='Image link' name="image" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                       
                                <div className='actions'> 
                                    <button className='btn btn-info'>Add Item</button>
                                </div>
                                <div className='pull-right'>
                                <button className='btn btn-primary'>Create Wishlist</button>
                                </div>
                            </form>
                    </div>
               </div>
        </>
       
    )
}