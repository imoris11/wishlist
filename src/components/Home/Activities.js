import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { database } from '../../helpers/Firebase';
import loadingGif from '../../assets/images/loading2.gif';
import moment from 'moment';

const Activities = (props) => {
    const [ activities, setActivities ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const getRecentActivities = () => {
        database.ref().child('activities').once('value', snapshots => {
            const temp = [];
            if (snapshots.exists()) {
                snapshots.forEach((snapshot) => {
                    temp.push({...snapshot.val(), key: snapshot.key });
                    setLoading(false);
                });
                setActivities(temp);
            }else{
                setLoading(false);
            }
        });
    }
    useEffect(() => {
        getRecentActivities();
    }, activities);

    if ( loading) 
        return (
            <p> Loading... </p>
        )

    if ( !loading && activities.length === 0 ) 
        return (
            <p>No recent activities</p>
        )

    return (
        <>
            {activities.map((activity) => 
                <Activity key={activity.key} activity={activity} />
            )}
        </>
       
    )
} 

export const Activity = ({ activity }) => {
    return (
        <div className='activity-container'>
             <div className='profile-picture' 
             style={{backgroundImage: `url(${activity.profilePicture})`, height:30, width:30, borderRadius:15, backgroundSize: 'cover'}} 
             ></div>
             <div className='activity'>
                <p  style={{margin:10}}><b> {activity.displayName} </b> {activity.action}   </p>
                <i className='timestamp'> {moment(activity.createdAt).format('LL')} </i>
             </div>
           
        </div>
    )
}

export default inject('store')(observer(Activities));