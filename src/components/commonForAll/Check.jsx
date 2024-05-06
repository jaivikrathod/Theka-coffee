import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Dashboard from '../Main/Dashboard/Dashboard';

const Check = () => {
  
    const isRootPath = location.pathname;
    if(isRootPath!="/"){
        return <Outlet/>;
    }else{
        return <Dashboard/>
    }
};  

export default Check;

