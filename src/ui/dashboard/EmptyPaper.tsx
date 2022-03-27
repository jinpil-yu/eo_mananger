import Grid from "@mui/material/Grid";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

const EmptyPaper = () => {
  return (
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
      <DoNotDisturbOnOutlinedIcon color={'disabled'} sx={{width: 100, height: 100, mb: 1}}/>
      <Typography variant="subtitle1" color="text.disabled" align="center" fontWeight="bold">
        {`데이터가 없습니다.`}
      </Typography>
      <Typography variant="subtitle1" color="text.disabled" align="center">
        <Link href={"https://console.firebase.google.com/project/eokorea-6e603/overview"}>
          Firebase에 접속
        </Link>
        {`하여 Realtime Database에 들어가신 뒤 데이터가 있는지 확인해 주시고`}
      </Typography>
      <Typography variant="subtitle1" color="text.disabled" align="center">
        {`없다면 개발자에게 문의해 주세요.`}
      </Typography>
    </Grid>
  )
}

export default EmptyPaper
