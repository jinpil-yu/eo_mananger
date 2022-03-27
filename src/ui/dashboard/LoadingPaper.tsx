import Grid from "@mui/material/Grid";
import {CircularProgress} from "@mui/material";
import * as React from "react";

const LoadingPaper = () => (
  <Grid
    container
    direction="column"
    sx={{
      width: '100%',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </Grid>
)

export default LoadingPaper
