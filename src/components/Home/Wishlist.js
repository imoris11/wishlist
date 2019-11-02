import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { profile } from '../../assets/images/login.jpg'
import {Menu } from '.././Sidebar/Menu'


export class Wishlist extends React.Component{
    constructor(props) {
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.state = {Toogle: false};
    }
    handleIconClick() {
        this.setState({Toogle: !this.state.Toogle});
        console.log(this.state.Toogle)
    }
    
    render() {
        return (
            <div>
                {this.state.Toogle && <div classname="absolute"><Menu/></div>}
                <div class="sidebarcontrol" onClick={this.handleIconClick} ><div></div></div>
                <h4 style={{marginLeft:20}}>Recent Wishlists</h4>
                <div className='card'>
                    <div className='card-header'>
                        <div style={{backgroundImage: `url(${profile})`, height:30, width:30, borderRadius:15, backgroundSize: 'cover', marginTop:20}} ></div>
                        <div className='user-info'>
                            <p className='username' > Richard Igbiriki </p>
                            <p className='time'>June 19, 2019</p>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div>
                            <h5>Birthday Gift Suggestions</h5>
                            <div className='card-item'>
                                <p className='item-name'> Nike Shoes </p>
                                <p className='item-price'>NGN1,200</p>
                            </div>
                        </div>
                    
                        <div className='likes-container' >
                            <FaHeart />
                            <span className='likes'>21</span>
                        </div>
                        
                    </div>
                    <div className='card-footer'>
                        <Link to='/wishlist'> <p className='btn btn-default'>View Full List</p> </Link>
                        <Link to='/'> <p className='btn btn-default'>Share List</p> </Link> 
                    </div>
                </div>
            </div>
        )
    }
}