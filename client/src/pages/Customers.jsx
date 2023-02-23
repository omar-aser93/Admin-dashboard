import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCustomersQuery } from '../redux/api'

const Customers = () => {

  const theme = useTheme();                                   //get MUI useTheme function
  const { data, isLoading } = useGetCustomersQuery();         //get Customers response from (Redux-TK query)   
  //Array to store columns header data for the MUI Grid
  const columns = [ { field: "_id", headerName: "ID", flex: 1 }, { field: "name", headerName: "Name", flex: 0.5 }, { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 0.5, renderCell: (params) => { return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"); } },
    { field: "country", headerName: "Country", flex: 0.4 }, { field: "occupation", headerName: "Occupation", flex: 1 }, { field: "role", headerName: "Role", flex: 0.5 } ];

  return (
    <Box m="1.5rem 2.5rem" pb="10px">
      {/* Header */}
      <Box>
      <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" > CUSTOMERS </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]} sx={{ mt: "5px" }}> List of Customers </Typography>
      </Box>

      {/*The Data Grid */}
      <Box mt="40px" height="75vh" sx={{"& .MuiDataGrid-root": { border: "none" }, "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": {backgroundColor: theme.palette.primary.light, },
          "& .MuiDataGrid-footerContainer": {backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderTop: "none" },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.secondary[200]} !important` } }} >
        
         <DataGrid  loading={isLoading || !data}  getRowId={(row) => row._id}  rows={data || []} columns={columns} />
      
      </Box>
    </Box>
  )
}

export default Customers