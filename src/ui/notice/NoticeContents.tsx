import {FC, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {Notice} from "../../data/model/notice";
import NoticeListComponent from "./NoticeListComponent";
import {Member} from "../../data/model/member";
import MemberSpecific from "../member/MemberSpecific";
import NoticeSpecific from "./NoticeSpecific";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WriteNotice from "./WriteNotice";

interface NoticeContentsProps {
  data: Notice[]
}

const NoticeContents: FC<NoticeContentsProps> = ({data}) => {
  const [depth, setDepth] = useState<string>('list')
  const [selected, setSelected] = useState<Notice | null | undefined>(null)


  function onClickRow({param}: {param: Notice}) {
    setSelected(param)
    setDepth('specific')
  }

  function goFirst() {
    setDepth('list')
  }

  function onClickCreateBtn() {
    setDepth('create')
  }

  function contentsProvider() {
    switch (depth) {
      case 'list': return <NoticeListComponent data={data} onClickRow={onClickRow}/>
      case 'specific': return <NoticeSpecific data={selected!} goBack={goFirst}/>
      case 'create': return <WriteNotice goBack={goFirst} />
    }
  }

  function buttonProvider() {
    switch (depth) {
      case 'list':
        return (
          <Button
            startIcon={<AddIcon/>}
            type="submit"
            variant="contained"
            onClick={onClickCreateBtn}
          >
            공지 추가
          </Button>
        )
      case 'specific':
        return (
          <>
            {/*// TODO: 수정*/}
            {/*<Button*/}
            {/*  sx={{mr: 1}}*/}
            {/*  startIcon={<EditIcon/>}*/}
            {/*  type="submit"*/}
            {/*  variant="contained"*/}
            {/*>*/}
            {/*  수정*/}
            {/*</Button>*/}
            <Button
              color={'error'}
              startIcon={<DeleteIcon/>}
              type="submit"
              variant="contained"
            >
              삭제
            </Button>
          </>
        )
      default: return <></>
    }
  }

  return (
    <>
      <Toolbar/>
      <Container maxWidth={false} sx={{mt: 4, mb: 4}}>
        <Grid minWidth="100vh" container sx={{}}>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{mb: 3}}
            >
              {buttonProvider()}
            </Grid>
            <Paper sx={{width: '100vh', p: 5, flexDirection: 'column'}}>
              {contentsProvider()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default NoticeContents
