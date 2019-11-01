import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import { auth } from '../../helpers/Firebase';

export const Reset = (props) => {
    const [ state, setState ] = useState({ errorMessage:'', successMessage:'' });
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        let temp = {...state};
        temp[e.target.name] = e.target.value;
        setState(temp);
    }
    const reset = () => {
        auth.sendPasswordResetEmail(state.email).then(()=> {
            let temp = {...state};
            temp['successMessage'] = 'Reset instructions have beens sent to your email';
            setState(temp);
        }).catch(e => {
            let temp = {...state};
            if (e.code === 'auth/user-not-found') {
                temp['errorMessage'] = 'Invalid email address provided'
            }else{
                temp['errorMessage'] = e.message;
            }
            
            setState(temp);
            setLoading(false);
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        reset();
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
                            <form onSubmit={handleSubmit} className='form'>
                                <h3>Reset Password</h3>
                                <div className='form-group'>
                                    <input type="email" placeholder='Email' name="email" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>
                                <div className='actions'> 
                                    <p>New? <b className="hint"><Link to='/signup'> Create an account </Link></b></p>
                                    <p>Already have an account? <b  className="hint"> <Link to='/'> Sign in </Link></b></p>
                                </div>
                                { state.errorMessage && <p className='text-center text-danger info'>{state.errorMessage}</p> }
                                { state.successMessage && <p className='text-center text-success info'>{state.successMessage}</p>}
                                <div className='pull-right'>
                                    {loading ? <p className='info'>Sending email...</p> :  
                                    <button type='submit' className='btn btn-primary'>Reset</button> }
                                </div>
                            </form>
                    </div>
               </div>
           </div>
           <i className='photo-credits'>Photo by Element5 Digital on Unsplash</i>
        </div>
    )
}