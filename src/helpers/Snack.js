import React, { useEffect, useState } from 'react';

const styles = {
    snack: {
        position:'fixed', 
        right:'1%', 
        top:'1%', 
        backgroundColor:'green', 
        color:'white', 
        paddingLeft:20, 
        paddingRight:20, 
        opacity:0.7
    }
}
export const Snack = ({ message }) => {
    const [ visible, setVisible ] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    })
    return (
        visible && <div 
            className='text-center' 
            style={styles.snack}>
            <p >{ message }</p>
        </div>
    )
}