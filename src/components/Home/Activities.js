import React from 'react'

export const Activities = (props) => {
    return (
        <Activity />
    )
} 

export const Activity = (props) => {
    const profile = require('../../assets/images/login.jpg');
    return (
        <div className='activity-container'>
             <div className='profile-picture' 
             style={{backgroundImage: `url(${profile})`, height:30, width:30, borderRadius:15, backgroundSize: 'cover'}} 
             ></div>
             <div className='activity'>
                <p  style={{margin:10}}><b> Richard Igbiriki </b> created a new wish list   </p>
                <i className='timestamp'>June 19, 2019</i>
             </div>
           
        </div>
    )
}