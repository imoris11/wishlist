import React, { useState } from 'react';
import Menu from "../components/Sidebar/Menu";

export const Icon = () => {
    const [ toggle, setToggle ] = useState(false);
    const toggleMenu = () => {
        setToggle(!toggle);
    }
    return (
        <>
            {toggle ? 
                <div className='absolute' >
                    <Menu />
                    <div style={{cursor:'pointer'}} className="sidebar-control" onClick={toggleMenu}>
                            <div className="sidebar-control-icon">&#9747;</div>
                        </div>
                </div>
                :
                <div style={{cursor:'pointer'}} className="sidebar-control" onClick={toggleMenu}>
                    <div className="sidebar-control-icon">&#9776;</div>
                </div>
            }
        </>
    )
}