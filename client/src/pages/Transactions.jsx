import { useState } from "react"
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from '../components/DataGridCustomToolbar'
import { useGetTransactionsQuery } from '../redux/api'

const Transactions = () => {

  const theme = useTheme();                                   //get MUI useTheme function
  const [searchInput, setSearchInput] = useState("");         //state to store search input
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  //get Transactions response from (Redux-TK query) after sending queries in the request
  const { data, isLoading } = useGetTransactionsQuery({ page, pageSize, sort: JSON.stringify(sort), search });

  //Array to store columns header data for the MUI Grid
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 }, { field: "userId", headerName: "User ID", flex: 1 }, { field: "createdAt", headerName: "CreatedAt", flex: 1 }, 
    { field: "products", headerName: "# of Products",  flex: 0.5, sortable: false, renderCell: (params) => params.value.length },
    { field: "cost", headerName: "Cost", flex: 1, renderCell: (params) => `$${Number(params.value).toFixed(2)}` } ];
    
  return (
    <Box m="1.5rem 2.5rem" pb='15px'>
    {/* Header */}
    <Box>
      <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" > TRANSACTIONS </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]} sx={{ mt: "5px" }}> Entire list of transactions </Typography>
    </Box>

    {/*The MUI Data Grid with Custom changes */}
    <Box height="80vh" sx={{"& .MuiDataGrid-root": { border: "none" },"& .MuiDataGrid-cell": { borderBottom: "none" },    
        "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderBottom: "none" },        
        "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderTop: "none" },
        "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.primary.light },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.secondary[200]} !important` }  }} >
      
      <DataGrid loading={isLoading || !data} getRowId={(row) => row._id}  rows={(data && data.transactions) || []}
        columns={columns} rowCount={(data && data.total) || 0} rowsPerPageOptions={[20, 50, 100]} pagination page={page}
        pageSize={pageSize} paginationMode="server" sortingMode="server" onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}  onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        components={{ Toolbar: DataGridCustomToolbar }} componentsProps={{ toolbar: { searchInput, setSearchInput, setSearch } }} />

    </Box>    
  </Box>
  )
}

export default Transactions