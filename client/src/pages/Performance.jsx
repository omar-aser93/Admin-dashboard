import { Box, useTheme,Typography } from "@mui/material";
import { useGetUserPerformanceQuery } from "../redux/api";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "../components/DataGridCustomColumnMenu";

const Performance = () => {

  const theme = useTheme();                                     //get MUI useTheme function
  const userId = useSelector((state) => state.globalSlice?.userId);   //get logged userId from the redux state 
  const { data, isLoading } = useGetUserPerformanceQuery(userId);     //get Use rPerformance response from (Redux-TK query)  
  //Array to store columns header data for the MUI Grid
  const columns = [
    {field: "_id", headerName: "ID", flex: 1 }, {field: "userId", headerName: "User ID", flex: 1 }, {field: "createdAt", headerName: "CreatedAt", flex: 1 },
    {field: "products", headerName: "# of Products", flex: 0.5, sortable: false, renderCell: (params) => params.value.length },
    {field: "cost", headerName: "Cost", flex: 1, renderCell: (params) => `$${Number(params.value).toFixed(2)}` } ];

  return (
    <Box m="1.5rem 2.5rem" pb="15px">
      {/* Header */}
      <Box>
        <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" > PERFORMANCE </Typography>
        <Typography variant="h5" color={theme.palette.secondary[300]} sx={{ mt: "5px" }}> Track your Affiliate Sales Performance Here </Typography>
      </Box>

      {/*The Data Grid */}
      <Box mt="40px" height="75vh" sx={{"& .MuiDataGrid-root": { border: "none" }, "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.primary.light },
          "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderTop: "none" },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.secondary[200]} !important` } }}  >
        
        <DataGrid loading={isLoading || !data} getRowId={(row) => row._id} rows={(data && data.sales) || []} columns={columns} components={{ ColumnMenu: CustomColumnMenu }} />
        
      </Box>
    </Box>
  )
}

export default Performance