import React, { useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import { auth } from '../../helpers/Firebase';
import { inject } from 'mobx-react';
import './Login.css';

 const Login = (props) => {
    let { store } = props;
    const [ state, setState ] = useState({ errorMessage:''});
    const [loading, setLoading ] = useState(false);
    
    const handleChange = (e) => {
        let temp = {...state};
        temp[e.target.name] = e.target.value;
        setState(temp);
    }
    const [loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
      const subscribe = auth.onAuthStateChanged(user => {
          if(user) {
              setLoggedIn(true);
          }else{
              setLoggedIn(false);
          }
        })
        return (()=> {
            subscribe();
        })
    }, []);

    const signin = () => {
        auth.signInWithEmailAndPassword(state.email, state.password).then(() => {
            const user = auth.currentUser;
            store.updateUser(user)
        })
        .catch(error => {
            let temp = {...state};
            temp['errorMessage'] = error.message;
            setState(temp);
            setLoading(false);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        signin();
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
                                <h3>Sign in</h3>
                                <div className='form-group'>
                                    <input type="email" placeholder='Email' name="email" onChange={handleChange} />
                                    <div className='divider'></div>
                                </div>
                                <div className='form-group'>
                                    <input placeholder='Password' type="password" name="password" onChange={handleChange}  autoComplete />
                                    <div className='divider'></div>
                                </div>
                                <div className='actions'> 
                                    <p>New? <b className="hint"><Link to='/signup'> Create an account </Link></b></p>
                                    <p>Forgot Password? <b  className="hint"> <Link to='/reset'> Reset </Link></b></p>
                                </div>
                                <p className='text-center text-danger error'>{state.errorMessage}</p>
                                <div className='pull-right'>
                                    {loading ? <p className='info'>Signing in...</p> : 
                                    <button type='submit' className='btn btn-primary'>Sign in</button> }
                                </div>
                            </form>
                    </div>
               </div>
           </div>
           <i className='photo-credits'>Photo by Element5 Digital on Unsplash</i>
           {loggedIn && <Redirect to='/home' /> }
        </div>
    )
}

export default inject('store')(Login)