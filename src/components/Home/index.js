import React from 'react'
import Wishlist from './Wishlist';
import Activities from './Activities';
import './Home.css';
import { inject } from 'mobx-react';

const Home = (props) => {
    // let { store } = props;
    // console.log(store) 
    const handleChange = (e) => {

    }
    
    return (
        <div className='row'> 
            <div className='col-sm-9'>
                <Wishlist />
            </div>
            <div className=' shadow col-sm-3 activities'>
                <div className='content'>
                    <h4 style={{marginLeft:20}} >Activities</h4>
                    <Activities />
                </div>
                
            </div>
        </div>
    )
}

export default inject('store')(Home);