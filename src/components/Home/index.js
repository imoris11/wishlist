import React from 'react'
import { Wishlist } from './Wishlist';
import { Activities } from './Activities';
import './Home.css';

export const Home = (props) => {
    const handleChange = (e) => {

    }
    return (
        <div className='row'> 
            <div className='col-sm-9'>
                <Wishlist />
            </div>
            <div className=' shadow col-sm-3 activities'>
                <div className='content'>
                    <input className='form-input' placeholder="Search" name="search" onChange={handleChange} />
                    <h4 style={{marginLeft:20}} >Activities</h4>
                    <Activities />
                </div>
                
            </div>
        </div>
    )
}