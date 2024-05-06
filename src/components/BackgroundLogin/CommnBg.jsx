import React, { useState } from 'react'
import logo from '../../assets/logo.jpeg'
import { Outlet } from 'react-router-dom';



export default function CommnBg() {
    return (
        <>
            <div className="d-flex_another bg_color">

                <div className="container_main">
                    <div className="container-left">
                        <img src={logo} alt="" className="" />
                    </div>
                    <div className="line"></div>

                    <div className="container-right">
                        <Outlet />
               
                    </div>
                </div>
            </div>
        </>
    )
}
