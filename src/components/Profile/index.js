import React, { useState } from 'react'
import { Nav } from '../Navigation';
import { inject, observer } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';
import { database, auth } from '../../helpers/Firebase';

const Profile = (props) => {
    let { store } = props;
    const [ state, setState ] = useState({name: store.name, paystack: store.paystack, email: store.email})
    const [message, setMessage ] = useState('');
    onSnapshot(store, snapshot => {
        setState({ 
            name: snapshot.name, 
            paystack:snapshot.paystack, 
            email:snapshot.email 
        });
    })
    const handleChange = (e) => {
        let temp = {...state};
        temp[e.target.name] = e.target.value;
        setState(temp);
    }
    const submitGeneral = (e) => {
        e.preventDefault();
        database.ref('users').child(store.uid).update({
            name:state.name,
            paystack: state.paystack
        }, (error) => {
            if(!error) {
                const user = auth.currentUser;
                user.updateProfile({
                    displayName: state.name
                })
                store.saveUser(state.name, state.paystack)
                setMessage('Successfully updated...')
            }
        })
        
    }
    const changePassword = (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        user.updatePassword(state.new_password).then(()=> {
            localStorage.removeItem('user');
            auth.signOut();
        })
    }
    return (
        <>
           <Nav title='Profile' />
            <div className='card'>
                <div className='center'>
                    <div style={{backgroundImage: `url(${store.photoURL})`, height:50, width:50, borderRadius:25, backgroundSize: 'cover', marginTop:20}} ></div>
                </div>
                <div className='wishlist-form' >
                    <h5>General</h5>
                    <form onSubmit={submitGeneral}>
                        <div className='form-group'>
                            <input value={state.name} type="text" placeholder='Name' name="name" onChange={handleChange} />
                            <div className='divider'></div>
                        </div>
                        <div className='form-group'>
                            <input value={state.email} type="email" disabled placeholder='Email' name="email" onChange={handleChange} />
                            <div className='divider'></div>
                        </div>

                        <div className='form-group'>
                            <input value={state.paystack} type="text" placeholder='Paystack Link' name="paystack" onChange={handleChange} />
                            <div className='divider'></div>
                        </div>
                        {message && <p className='text-ccenter text-success info'> {message} </p>}
                        <div className='pull-right'>
                            <button type='submit' className='btn btn-primary btn-rounded'>Save</button>
                        </div>
                    </form>
            
                    <h5>Password</h5>
                    <form onSubmit={changePassword}>
    
                        <div className='form-group'>
                            <input type="password" placeholder='New Password' name="new_password" onChange={handleChange} />
                            <div className='divider'></div>
                        </div>
                        <div className='pull-right'>
                        <button className='btn btn-danger'>Update</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
       
    )
}

export default inject('store')(observer(Profile))