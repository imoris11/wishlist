import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';

export const Signup = (props) => {
    const [ state, setState ] = useState({ });
    const handleChange = (e) => {
        let temp = {...state};
        temp[e.target.name] = e.target.value;
        setState(temp);
    }
    return (
        <div className="row">

           <div className="col-sm-4 image-container">
               <div  className="bg-image"></div>
           </div>

           <div className='col-sm-8 form-container'>
               <div className='row'>
                    <div className='form-control'>
                        <h3 className='wish'>Make a wish <FaGift className='primary icon' /> </h3>
                            <form className='form'>
                                <h3>Sign up</h3>
                                <div className='form-group'>
                                    <input type="text" placeholder='Name' name="name" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input type="email" placeholder='Email' name="email" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>
                                <div className='form-group'>
                                    <input placeholder='Password' type="password" name="password" onChange={handleChange}  autoComplete />
                                    <div className='divider'></div>
                                </div>
                                <div className='actions'> 
                                    <p>Already have an account? <b className="hint"> <Link to='/'> Sign in </Link></b></p>
                                </div>
                                <div className='pull-right'>
                                <button className='btn btn-primary'>Sign up</button>
                                </div>
                            </form>
                    </div>
               </div>
           </div>
           <i className='photo-credits'>Photo by Element5 Digital on Unsplash</i>
        </div>
    )
}