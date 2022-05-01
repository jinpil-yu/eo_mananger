import React, {FC, useState} from 'react'
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Contact} from "../../data/model/contact";
import ContactDetail from "./ContactDetail";
import ContactEdit from "./ContactEdit";
import {Menu} from "../dashboard/DashboardController";

interface ContactControllerProps {
  data: Contact[]
  fetch: (menu: Menu) => void
}

const ContactController: FC<ContactControllerProps> = ({data, fetch}) => {
  const [depth, setDepth] = useState<string>('list')

  function onClickEdit() {
    setDepth('edit')
  }

  function goFirst() {
    setDepth('list')
  }

  function functionalButtonProvider() {
    switch (depth) {
      case 'list': return (
        <Button
          sx={{mr: 1}}
          startIcon={<EditIcon/>}
          type="submit"
          variant="contained"
          onClick={onClickEdit}
        >
          수정
        </Button>
      )
      case 'edit': <></>
    }
  }

  function contentsProvider() {
    switch (depth) {
      case 'list': return <ContactDetail data={data[0]} />
      case 'edit': return <ContactEdit data={data[0]} goBack={goFirst} fetch={fetch}/>
    }
  }

  return (
    <>
      <Toolbar/>
      <Container maxWidth={false} sx={{mt: 4, mb: 4}}>
        <Grid container>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{mb: 3}}
            >
              {functionalButtonProvider()}
            </Grid>
            <Paper sx={{width: '100%', p: 5, flexDirection: 'column'}}>
              {contentsProvider()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ContactController
