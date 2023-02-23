import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Box } from "@mui/material";
import {GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton} from "@mui/x-data-grid";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (   //render manually crated top toolbar for MUI grid
    <GridToolbarContainer>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}} width="100%">
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
        <TextField sx={{ mb: "0.5rem", width: "15rem" }} onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}  variant="standard" label="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton  onClick={() => { setSearch(searchInput);  setSearchInput("");  }}   >
                  <Search />
                </IconButton>
              </InputAdornment>  ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar