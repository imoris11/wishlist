import React from 'react'
import { Menu } from './Menu'

export const Sidebar = (props) => {
    return (
        <div className='row'>
            <div className='col-sm-3 sidebar'>
               <Menu />
            </div>
            <div className='col-sm-9 page-content'>
                 {props.children}
            </div>
        </div>
    )
}