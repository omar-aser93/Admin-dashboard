import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useGetUserQuery } from '../redux/api'

const Layout = () => {

  const isNonMobile = useMediaQuery("(min-width: 600px)");    //boolean stores screen type using MUI (useMediaQuery)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);   //state stores if the sidebar is open or not
  const userId = useSelector((state) => state.globalSlice?.userId);   //get logged userId from redux state 
  const { data } = useGetUserQuery(userId);        //pass userId to the Api hook & get response from (Redux-TK query) 
  
  return (
    <div style={{width:'100%', height:'100%', display: isNonMobile ? "flex" : "block" ,}}>
       <Sidebar user={data || {}} isNonMobile={isNonMobile} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} drawerWidth="268px"/>
      <div style={{flexGrow : '1'}}>      
        <Navbar user={data || {}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <Outlet />    {/* from router-dom , a placeholder for other routes as we wraped all of them inside the Layout route */}
      </div>      
    </div>
  )
}

export default Layout