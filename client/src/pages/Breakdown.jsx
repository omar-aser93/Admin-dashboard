import { Box, Typography, useTheme } from "@mui/material";
import BreakdownChart from '../components/BreakdownChart'

const Breakdown = () => {  

  const theme = useTheme();                               //get MUI useTheme function 
  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Box>
       <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" > BREAKDOWN </Typography>
       <Typography variant="h5" color={theme.palette.secondary[300]} sx={{ mt: "5px" }}> Breakdown of Sales By Category </Typography>
      </Box>
      
      {/*Render the imported chart component */}
      <Box mt="40px" height="74vh">
          <BreakdownChart />
      </Box>
    </Box>
  )
}

export default Breakdown