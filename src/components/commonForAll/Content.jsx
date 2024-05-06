import React from 'react'
import Navbar from '../Main/Navbar/Navbar2'
import Sidebar from '../Main/Sidebar/Sidebar'
import Sidebar_general from '../Main/Sidebar/sidebar_general'
import Check from './Check'
import { useSelector} from "react-redux"


export default function Content() {
  
  // const username = useSelector((state) => state.username.value);
  // alert(useSelector((state)=>state.username.value))
  let sidebar = true;
  const username =window.localStorage.getItem("user");
  if(username!="Admin"){
    sidebar =false;
  }
  return (
    <>
      <Navbar/>
      {sidebar?<Sidebar/>:<Sidebar_general/>}
      {/* <Sidebar/> */}
      {/* <Outlet/> */}
      <Check/>
    </>
  )
}
