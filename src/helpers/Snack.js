import React from 'react';

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
    return (
        <div 
            className='text-center' 
            style={styles.snack}>
            <p >{ message }</p>
        </div>
    )
}