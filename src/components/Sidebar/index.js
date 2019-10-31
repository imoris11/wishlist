import React from 'react'
import { Menu } from './Menu'

export const Sidebar = (props) => {
    return (
        <div className='row'>
            <div className='col-sm-3'>
               <Menu />
            </div>
            <div className='col-sm-9'>
                 {props.children}
            </div>
        </div>
    )
}