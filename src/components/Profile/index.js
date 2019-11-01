import React from 'react'
import { Nav } from '../Navigation';

 export const Profile = (props) => {
    const profile = require('../../assets/images/login.jpg');
    const handleChange = (e) => {

    }
    return (
        <>
           <Nav title='Profile' />
            <div className='card'>
                <div className='center'>
                    <div style={{backgroundImage: `url(${profile})`, height:50, width:50, borderRadius:25, backgroundSize: 'cover', marginTop:20}} ></div>
                </div>
                <form className='wishlist-form' >
                    <h5>General</h5>
                    <div className='form-group'>
                        <input type="text" placeholder='Name' name="name" onChange={handleChange} />
                        <div className='divider'></div>
                    </div>
                    <div className='form-group'>
                        <input type="email" disabled placeholder='Email' name="email" onChange={handleChange} />
                        <div className='divider'></div>
                    </div>

                    <div className='form-group'>
                        <input type="text" placeholder='Paystack Link' name="paystack" onChange={handleChange} />
                        <div className='divider'></div>
                    </div>
                    <div className='pull-right'>
                        <button className='btn btn-primary btn-rounded'>Save</button>
                    </div>
                    <h5>Password</h5>
                    <div className='form-group'>
                        <input type="password" placeholder='Old Password' name="old_password" onChange={handleChange} />
                        <div className='divider'></div>
                    </div>

                    <div className='form-group'>
                        <input type="password" placeholder='New Password' name="new_password" onChange={handleChange} />
                        <div className='divider'></div>
                    </div>
                    <div className='pull-right'>
                    <button className='btn btn-danger'>Update</button>
                    </div>
                </form>
            </div>
        </>
       
    )
}