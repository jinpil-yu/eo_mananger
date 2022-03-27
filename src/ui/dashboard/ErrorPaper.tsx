import Grid from "@mui/material/Grid";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import * as React from "react";

const ErrorPaper = () =>
  (
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
      <ErrorIcon color="error" sx={{width: 100, height: 100, mb: 1}} />
      <Typography variant="subtitle1" color="text.error" align="center" fontWeight="bold">
        {`에러가 발생했습니다.`}
      </Typography>
      <Typography variant="subtitle1" color="text.error" align="center">
        {`계속 발생한다면 F12를 눌러 개발자 도구를 실행한 뒤`}
      </Typography>
      <Typography variant="subtitle1" color="text.error" align="center">
        {`개발자 도구에서 Console 탭을 눌러주신다음`}
      </Typography>
      <Typography variant="subtitle1" color="text.error" align="center">
        {`전체 로그를 복사하여 개발자에 문의시 함께 전달해 주세요.`}
      </Typography>
    </Grid>
  )

export default ErrorPaper
