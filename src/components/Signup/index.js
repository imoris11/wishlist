import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import { auth, database } from '../../helpers/Firebase';
const photoURL = 'https://firebasestorage.googleapis.com/v0/b/wishlist-b5d9c.appspot.com/o/585e4bf3cb11b227491c339a.png?alt=media&token=f8bf9736-7fb0-4173-9a21-b4adc85c3085';
export const Signup = (props) => {
    const [ state, setState ] = useState({errorMessage:''});
    const [loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        let temp = {...state};
        temp[e.target.name] = e.target.value;
        setState(temp);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        auth.createUserWithEmailAndPassword(state.email, state.password).then(() => {
            const user = auth.currentUser;
            user.updateProfile({
                displayName: state.name,
                photoURL: photoURL
            }).then(() => {
                database.ref().child('users').child(user.uid).update({
                    email: state.email,
                    uid:user.uid,
                    name:state.name,
                    created_at: Date.now()
                })
                 //easier hack...lol
                window.location.href='/home';
            })
        })
        .catch(error => {
            const errorCode = error.code;
            let errorMessage = error.message
            if(errorCode === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Try again'
            }
            let temp = {...state};
            temp['errorMessage'] = errorMessage;
            setState(temp);
            setLoading(false)
        });
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
                                <h3>Sign up</h3>
                                <div className='form-group'>
                                    <input required type="text" placeholder='Name' name="name" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>

                                <div className='form-group'>
                                    <input required type="email" placeholder='Email' name="email" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>
                                <div className='form-group'>
                                    <input required placeholder='Password' type="password" name="password" onChange={handleChange}  autoComplete />
                                    <div className='divider'></div>
                                </div>
                                <div className='actions'> 
                                    <p>Already have an account? <b className="hint"> <Link to='/'> Sign in </Link></b></p>
                                </div>
                                <p className='text-center text-danger info'>{state.errorMessage}</p>
                                <div className='pull-right'>
                                    {loading ? <p className='info'>Signing up...</p> : 
                                    <button type='submit' className='btn btn-primary'>Sign up</button> }
                                </div>
                            </form>
                    </div>
               </div>
           </div>
           <i className='photo-credits'>Photo by Element5 Digital on Unsplash</i>
        </div>
    )
}