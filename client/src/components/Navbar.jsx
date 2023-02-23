import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {AppBar, Button, Box, Typography, IconButton, InputBase, Toolbar, Menu, MenuItem, useTheme,} from "@mui/material";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setMode } from '../redux/globalSlice'

const Navbar = ({ isSidebarOpen, setIsSidebarOpen , user}) => {

  const dispatch = useDispatch() ;                //get the dispatch function
  const theme = useTheme() ;                      //get MUI useTheme function
  //MUI Menu 
  const [anchorEl, setAnchorEl] = useState(null);         //state to check if dropdown menu is open or close
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return ( //render navbar using MUI materials
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none",}}>
      <Toolbar sx={{justifyContent: "space-between",}}>

        {/* LEFT SIDE */}
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
          <IconButton onClick={()=> setIsSidebarOpen(!isSidebarOpen) }> <MenuIcon /> </IconButton>
          <Box backgroundColor={theme.palette.background.alt}  borderRadius="9px"  gap="3rem" p="0.1rem 1.5rem" m='0 5px'
              sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
                <InputBase placeholder='Search ...'/>
                <IconButton > <SearchIcon /> </IconButton>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}} gap="1.5rem">
          <IconButton  onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon sx={{ fontSize: "25px" }} /> 
                                           : <LightModeOutlinedIcon sx={{ fontSize: "25px" }} /> }  </IconButton>
          <IconButton> <SettingsOutlinedIcon sx={{ fontSize: "25px" }} /> </IconButton>
          {/* USER MENU */}
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
           <Button onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem" }} >
              <Box component="img" alt="profile" src='./images/profile.png' height="32px" width="32px" borderRadius="50%" sx={{ objectFit: "cover" }} />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}>{user.name}</Typography>
                <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }} > {user.occupation} </Typography>
              </Box>
              <ArrowDropDownOutlinedIcon sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}  />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </Box>          
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar