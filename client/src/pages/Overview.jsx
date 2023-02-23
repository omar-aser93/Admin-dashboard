import { useState } from "react"
import { FormControl, MenuItem, InputLabel, Box, Select, Typography, useTheme } from "@mui/material";
import OverviewChart from '../components/OverviewChart'

const Overview = () => {

  const theme = useTheme();                               //get MUI useTheme function
  const [view, setView] = useState("units");              //state to store the chart view type option
  return (
    <Box m="1.5rem 2.5rem" pb='15px'>
      {/* Header */}
      <Box>
      <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" > OVERVIEW </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]} sx={{ mt: "5px" }}> Overview of general revenue and profit </Typography>
      </Box>

      {/* Sales overview chart */}
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select value={view} label="View" onChange={(e) => setView(e.target.value)}  >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  )
}

export default Overview