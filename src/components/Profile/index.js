import React, { useState } from 'react'
import { Nav } from '../Navigation';
import { inject, observer } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';
import { database, auth, storage } from '../../helpers/Firebase';
import { Snack } from '../../helpers/Snack';
import FileReaderInput from 'react-file-reader-input';
import { Icon } from '../../helpers/Icon';

const Profile = (props) => {
    let { store } = props;
    const [ state, setState ] = useState({name: store.name, paystack: store.paystack, email: store.email, profilePicture: store.photoURL})
    const [message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);

    onSnapshot(store, snapshot => {
        setState({ 
            name: snapshot.name, 
            paystack: snapshot.paystack, 
            email: snapshot.email ,
            profilePicture: snapshot.photoURL
        });
    })
    const handleChange = (e) => {
        let temp = {...state};
        temp[e.target.name] = e.target.value;
        setState(temp);
    }
    const submitGeneral = (e) => {
        e.preventDefault();
        setLoading(true);
        if ( state.profilePicture !== store.photoURL ) {
            uploadProfilePicture(state.profilePicture);
        }else{
            updateUserProfile(store.photoURL);
        }
    }
    const uploadProfilePicture = ( profilePicture ) => {
        const session = Date.now();
        const ref = storage.ref().child('images').child(`${session}`);
        let uploadTask = ref.putString(profilePicture, 'data_url');
        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //Find a way to use progress to show the progress on the UI
          }, (error) => {
            // Handle unsuccessful uploads
            setMessage('File upload failed...');
            setLoading(false);
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                updateUserProfile(downloadURL);
            });
          });
    }
    const updateUserProfile = (photoURL) => {
        database.ref('users').child(store.uid).update({
            name:state.name,
            paystack: state.paystack,
            profilePicture: photoURL
        }, (error) => {
            if(!error) {
                const user = auth.currentUser;
                user.updateProfile({
                    displayName: state.name,
                    photoURL: photoURL
                }).then(()=> {
                    let tempUser = {
                        uid: user.uid,
                        name: state.name,
                        email: state.email,
                        photoURL: photoURL,
                        paystack: state.paystack,
                        created_at: 0,
                        wishList: [],
                        shared: []
                    }
                    localStorage.setItem('user', JSON.stringify(tempUser));
                });
                
                store.saveUser(state.name, state.paystack, photoURL);
                setMessage('Successfully updated user details');
                setLoading(false);
            }
        });
    }
    const changePassword = (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        user.updatePassword(state.new_password).then(()=> {
            localStorage.removeItem('user');
            auth.signOut();
        })
    }
    const handleImageChange = ( e, results ) => {
        results.forEach(result => {
            const [e, file] = result;
            let temp = { ...state };
            temp.profilePicture = e.target.result;
            setState(temp);
        });
    }
    return (
        <>
           <Nav title='Profile' />
           <Icon />
            <div className='card'>
                <div className='center'>
                    <FileReaderInput as="url" onChange={handleImageChange}>
                        <div style={{backgroundImage: `url(${state.profilePicture})`, height:50, width:50, borderRadius:25, backgroundSize: 'cover', marginTop:20, cursor:'pointer'}} ></div>
                    </FileReaderInput>
                    
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
                            {message &&  <Snack message={message} />}
                        <div className='pull-right'>
                            {loading ? <p className='info'>Updating profile...</p> : <button type='submit' className='btn btn-primary btn-rounded'>Save</button> } 
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