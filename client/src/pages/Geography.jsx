import { Box, useTheme, Typography } from "@mui/material";
import { useGetGeographyQuery } from '../redux/api'
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../geoData";

const Geography = () => {

  const theme = useTheme();                                   //get MUI useTheme function
  const { data } = useGetGeographyQuery();        //get Customers response from (Redux-TK query) 
  return (
    <Box m="1.5rem 2.5rem" pb='20px'>
       {/* Header */}
       <Box>
       <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" > GEOGRAPHY </Typography>
       <Typography variant="h5" color={theme.palette.secondary[300]} sx={{ mt: "5px" }}> Find where your users are located. </Typography>
      </Box>

      {/* Render the loctions data from the DB , into the nivo Choropleth map (check the docs) */}
      <Box mt="40px" height="75vh" border={`1px solid ${theme.palette.secondary[200]}`} borderRadius="4px"  >
        {data ? (
           <ResponsiveChoropleth data={data} theme={{ axis: { domain: { line: { stroke: theme.palette.secondary[200] } },
                legend: { text: { fill: theme.palette.secondary[200] } }, ticks: { line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
                text: { fill: theme.palette.secondary[200] } }  }, legends: { text: { fill: theme.palette.secondary[200]  } }, tooltip: { container: { color: theme.palette.primary.main } }  }}
             features={geoData.features}   margin={{ top: 0, right: 0, bottom: 0, left: -50 }}  domain={[0, 60]} unknownColor="#666666" borderWidth={1.3}
             label="properties.name" valueFormat=".2s" projectionScale={150} projectionTranslation={[0.45, 0.6]} projectionRotation={[0, 0, 0]}  borderColor="#ffffff"
             legends={[ {
                anchor: "bottom-right", direction: "column", justify: true, translateX: 0, translateY: -125, itemsSpacing: 0,
                itemWidth: 94, itemHeight: 18, itemDirection: "left-to-right", itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85, symbolSize: 18, effects: [{ on: "hover", style: { itemTextColor: theme.palette.background.alt, itemOpacity: 1  }}  ],
              }] }  />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  )
}

export default Geography