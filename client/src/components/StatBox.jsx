import { Box, Typography, useTheme } from "@mui/material";

const StatBox = ({ title, value, increase, icon, description }) => {

  const theme = useTheme();                          //get MUI useTheme function  
  return (
    <Box gridColumn="span 2" gridRow="span 1" display="flex" flexDirection="column" justifyContent="space-between"
         p="1.25rem 1rem" flex="1 1 100%" backgroundColor={theme.palette.background.alt} borderRadius="0.55rem" >
    
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
      <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
        {title}
      </Typography>
      {icon}
    </Box>

    <Typography variant="h3" fontWeight="600" sx={{ color: theme.palette.secondary[200] }} >
      {value}
    </Typography>

    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}} gap="1rem">
      <Typography variant="h5" fontStyle="italic" sx={{ color: theme.palette.secondary.light }} >
        {increase}
      </Typography>
      <Typography>{description}</Typography>
    </Box>
  </Box>
  )
}

export default StatBox