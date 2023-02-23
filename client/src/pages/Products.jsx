import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from '../redux/api'
import Product from '../components/Product'


const Products = () => {

  const { data, isLoading } = useGetProductsQuery();          //get products response from (Redux-TK query) 
  const isNonMobile = useMediaQuery("(min-width: 1000px)");   //boolean stores screen type using MUI (useMediaQuery)
  const theme = useTheme();                                   //get MUI useTheme function
  return (
    <Box m="1.5rem 2.5rem" pb="10px">
      {/* Header */}
      <Box>
      <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" > PRODUCTS </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]} sx={{ mt: "5px" }}> See your list of products. </Typography>
      </Box>
      
      {/* if we got data response , then pass it to the single product component , else show (Loading...)  */}
      {data || !isLoading ? (
        <Box mt="20px" display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))" justifyContent="space-between"
          rowGap="20px" columnGap="1.33%" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }  }} >

          {data.map(({ _id, name, description, price, rating, category, supply, stat }) => (
              <Product key={_id} _id={_id} name={name} description={description} price={price} rating={rating} category={category} supply={supply} stat={stat} />
            )
          )}

        </Box>
      ) : ( <>Loading...</> )}
    </Box>
  )
}

export default Products