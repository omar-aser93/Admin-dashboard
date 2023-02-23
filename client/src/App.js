import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';              //import from the theme file we created
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Customers from './pages/Customers'
import Transactions from './pages/Transactions'
import Geography from './pages/Geography'
import Overview from './pages/Overview'
import Daily from './pages/Daily'
import Monthly from './pages/Monthly'
import Breakdown from './pages/Breakdown'
import Admin from './pages/Admin'
import Performance from './pages/Performance'


function App() {  //the Front-end routing using react-router-dom

const mode = useSelector((state) => state.globalSlice?.mode);      //get mode value from the globalSlice state 
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);  //MUI createTheme using theme file we created
return (    
    <BrowserRouter> 
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Layout component contains navbar & sidebar , we wrap it around all routes instead of repeating it inside each one*/}
            <Route element={<Layout />}>   
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route> 
          </Routes>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
