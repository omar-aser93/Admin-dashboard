import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, } from "@mui/material";
import { SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined,  
        PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined,  AdminPanelSettingsOutlined, TrendingUpOutlined, PieChartOutlined, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, drawerWidth, isNonMobile, user}) => {

 //Array of static data that stores the side menu items & icons , we will map through it to render each item
 const navItems = [ { text: "Dashboard", icon: <HomeOutlined />,  }, { text: "Client Facing", icon: null, },  
    { text: "Products", icon: <ShoppingCartOutlined />, }, { text: "Customers", icon: <Groups2Outlined />, }, 
    { text: "Transactions", icon: <ReceiptLongOutlined />,  }, { text: "Geography", icon: <PublicOutlined />, }, 
    { text: "Sales", icon: null,  },   { text: "Overview",  icon: <PointOfSaleOutlined />, },
    { text: "Daily", icon: <TodayOutlined />, },  { text: "Monthly", icon: <CalendarMonthOutlined />, },
    { text: "Breakdown", icon: <PieChartOutlined />, },  { text: "Management", icon: null, },
    { text: "Admin", icon: <AdminPanelSettingsOutlined />,  },  { text: "Performance", icon: <TrendingUpOutlined />,  },
  ];

 const { pathname } = useLocation();                 //get url path name using router-dom useLocation function
 const [active, setActive] = useState("");           //state to store which page is currently active
 const navigate = useNavigate();                     //get useNavigate function for auto redirect
 const theme = useTheme();                           //get MUI useTheme function

 useEffect(() => {  //get the url pathName & store it in the state , every time the path change
    setActive(pathname.substring(1));
  }, [pathname]);

return (
    <Box component="nav">
        {isSidebarOpen && (
             <Drawer open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} variant="persistent" anchor="left" 
              sx={{ width: drawerWidth, "& .MuiDrawer-paper": { color: theme.palette.secondary[200], boxSixing: "border-box",
              backgroundColor: theme.palette.background.alt, borderWidth: isNonMobile ? 0 : "2px", width: drawerWidth, }, }} >
          
          <Box width="100%">
            {/* LOGO Area */}
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box color={theme.palette.secondary.main} sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}} >
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold"> ECOM-Admin </Typography>
                </Box>
                {/* close Drawer icon .. only on phone screens*/}
                {!isNonMobile && ( <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}> <ChevronLeft /> </IconButton> )}
              </Box>
            </Box>

            {/* MENU ITEMS */}
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return ( <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}> {text}  </Typography>  );  
                } else {
                const lcText = text.toLowerCase();    //get sidebar items in lower case to use at routing URL
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton  onClick={() => { navigate(`/${lcText}`);  setActive(lcText);  }}
                      sx={{ backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                        color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100] }} >

                      <ListItemIcon sx={{ ml: "2rem", color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200], }} >
                        {icon}
                      </ListItemIcon>                      
                      <ListItemText primary={text} />
                      {active === lcText && ( <ChevronRightOutlined sx={{ ml: "auto" }} /> )}
                    </ListItemButton>
                  </ListItem>
                );
               }
              })}
            </List>
          </Box>

          {/* USER Area */}
          <Box paddingBottom="8px" bottom="2rem">
            <Divider />
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}} textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box component="img" alt="profile" src='./images/profile.png' height="40px" width="40px" borderRadius="50%" sx={{ objectFit: "cover" }} />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}> {user.name} </Typography>
                <Typography fontSize="0.7rem" sx={{ color: theme.palette.secondary[200] }}>{user.occupation}</Typography>
              </Box>
              <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px ", }} />
            </Box>
          </Box>
        </Drawer>   )}
    </Box>
  )
}

export default Sidebar