import React, {FC, useState} from 'react'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Contact} from "../../data/model/contact";
import ContactDetail from "./ContactDetail";

interface ContactControllerProps {
  data: Contact[]
}

const ContactController: FC<ContactControllerProps> = ({data}) => {
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
              <Button
                sx={{mr: 1}}
                startIcon={<EditIcon/>}
                type="submit"
                variant="contained"
              >
                수정
              </Button>
            </Grid>
            <Paper sx={{width: '100%', p: 5, flexDirection: 'column'}}>
              <ContactDetail data={data[0]} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ContactController
