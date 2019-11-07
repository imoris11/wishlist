import React, { useState, useEffect} from 'react';
import { FaGift } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import './Menu.css';
import { auth, database } from '../../helpers/Firebase';
import { observer, inject } from 'mobx-react';

 const Menu = (props) => {
    const [loggedIn, setLoggedIn ] = useState(true);
    let { store } = props;
    const getMyWishlists = (userId) => {
        const wishLists = []
        database.ref().child('wishlists').orderByChild('uid').equalTo(userId).once('value', snapshots => {
            if (snapshots.exists()) {
                snapshots.forEach((wishList) => {
                    wishLists.push({...wishList.val(), key: wishList.key });
                    store.setWishLists(wishLists);
                })
            }else {
                //No wishes
            }
        });
    }

    const getRecentLists = () => {
        const wishLists = []
        database.ref().child('wishlists').limitToFirst(100).once('value', snapshots => {
            if (snapshots.exists()) {
                snapshots.forEach((wishList) => {
                    wishLists.push({...wishList.val(), key: wishList.key });
                    store.setRecentLists(wishLists);
                })
            }else {
                //No wishes
            }
        });
    }
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(user => {
        if(user) {
            let local_user = JSON.parse(localStorage.getItem('user'));
            getMyWishlists(user.uid);
            getRecentLists();
            if (local_user === null) {
                store.updateUser(user);
                database.ref().child('users').child(user.uid).child('paystack').once('value', snapshot =>{
                    if (snapshot.exists()) {
                        let tempUser = {
                            uid: user.uid,
                            name: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            paystack: snapshot.val(),
                            created_at: 0,
                            wishList: [],
                            shared: []
                        }
                        localStorage.setItem('user', JSON.stringify(tempUser));
                        store.updatePaystack(snapshot.val());
                    }
                });
            }
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
      })
      return (()=> {
          subscribe();
      })
      }, [store]);
      const logout = () => {

        localStorage.removeItem('user')
          auth.signOut()
      }
    return (
        <div className='shadow' >
            <Link to='/profile' className='profile-container'>
                <div style={{backgroundImage: `url(${store.photoURL})`, height:40, width:40, borderRadius:20, backgroundSize: 'cover', marginTop:20}} ></div>
                <h4 className='username' style={{marginTop:30}}> {store.name} </h4>
            </Link>
            <div className='center new-wishlist'>
                 
                 <Link className='btn btn-success btn-rounded' to='/wishlist/new'>
                   Create a wishlist
                 </Link>  
            </div>
           <div className='section'>
               <p className='section-header'>My Wishlists</p>
           </div>
           <ul>
               {store.wishList.length === 0 && <p>No Wishlists</p>}
               {store.wishList.map((list, idx) =>
                    <li key={idx}>
                        <Link to='/mywishlist' className='list-item'> {list.title} <span className='gift-items'>{list.numberOfItems()}  <FaGift /> </span>  </Link> 
                    </li>
                )}
           </ul>
           <p onClick={logout} className='text-center text-danger logout'>Log Out</p>
           {!loggedIn && <Redirect to='/' /> }
        </div>
    )
}

export default inject('store')(observer(Menu))