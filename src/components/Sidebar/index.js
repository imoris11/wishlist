import React from 'react'
import Menu from './Menu'
import { inject, observer } from 'mobx-react'

 const Sidebar = (props) => {
     let { store } = props;
    return (
        <div className='row'>
            <div className='col-sm-3 sidebar'>
               <Menu store={store} />
            </div>
            <div className='col-sm-9 page-content'>
                 {props.children}
            </div>
        </div>
    )
}

export default inject('store')(observer(Sidebar));