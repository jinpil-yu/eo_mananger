import React, {FC, useEffect, useState} from 'react'
import {Menu} from "../dashboard/DashboardController";
import {Grid, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Contact} from "../../data/model/contact";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {getDatabase} from "firebase/database";
import * as DB from "firebase/database";

interface ContactEditProps {
  data: Contact
  goBack: () => void
  fetch: (menu: Menu) => void
}

const ContactEdit: FC<ContactEditProps> = ({data, goBack, fetch}) => {
  const [newContact, setNewContact] = useState<Contact>({
    manager: '',
    email: '',
    address: '',
    note: '',
    tel: '',
    tel2: '',
  })

  useEffect(() => {
    setNewContact(data)
  }, [])

  const handleManagerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({
      ...newContact,
      manager: event.target.value
    });
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({
      ...newContact,
      address: event.target.value
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({
      ...newContact,
      email: event.target.value
    });
  };

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({
      ...newContact,
      tel: event.target.value
    });
  };

  const handleTel2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({
      ...newContact,
      tel2: event.target.value
    });
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({
      ...newContact,
      note: event.target.value
    });
  };

  const handleSubmitCreate = () => {
    const db = getDatabase();

    const updates = {
      [`contactus/manager`]: newContact.manager,
      [`contactus/address`]: newContact.address,
      [`contactus/email`]: newContact.email,
      [`contactus/tel`]: newContact.tel,
      [`contactus/tel2`]: newContact.tel2,
      [`contactus/note`]: newContact.note,
    };

    DB.update(DB.ref(db), updates)
      .then(() => {
        fetch(Menu.contact)
        alert('메니저 정보 수정이 완료 되었습니다.')
        goBack()
      })
      .catch((reason) => {
        alert(reason)
      })
    }

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton color={'primary'} sx={{ bottom: 20,right: 20}} onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Button
          sx={{ bottom: 20}}
          color={'primary'}
          type="submit"
          variant="contained"
          onClick={handleSubmitCreate}
        >
          저장
        </Button>
      </Grid>
      <Grid item xs={12} sm={10} mb={3}>
        <TextField
          value={`${newContact.manager}`}
          sx={{
            width: 500
          }}
          required
          id="manager"
          name="manager"
          label="메니저"
          autoComplete={'manager'}
          variant="standard"
          onChange={handleManagerChange}
        />
      </Grid>
      <Grid item xs={12} sm={10} mb={3}>
        <TextField
          value={`${newContact.address}`}
          sx={{
            width: 500
          }}
          required
          id="address"
          name="address"
          label="주소"
          autoComplete={'address'}
          variant="standard"
          onChange={handleAddressChange}
        />
      </Grid>
      <Grid item xs={12} sm={10} mb={3}>
        <TextField
          value={`${newContact.email}`}
          sx={{
            width: 500
          }}
          required
          id="email"
          name="email"
          label="이메일"
          autoComplete={'email'}
          variant="standard"
          onChange={handleEmailChange}
        />
      </Grid>
      <Grid item xs={12} sm={10} mb={3}>
        <TextField
          value={`${newContact.tel}`}
          sx={{
            width: 500
          }}
          required
          id="tel"
          name="tel"
          label="전화번호"
          autoComplete={'tel'}
          variant="standard"
          onChange={handleTelChange}
        />
      </Grid>
      <Grid item xs={12} sm={10} mb={3}>
        <TextField
          value={`${newContact.tel2}`}
          sx={{
            width: 500
          }}
          required
          id="tel2"
          name="tel2"
          label="전화번호2"
          autoComplete={'tel2'}
          variant="standard"
          onChange={handleTel2Change}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          value={`${newContact.note}`}
          sx={{
            width: 500
          }}
          required
          id="note"
          name="note"
          label="노트"
          autoComplete={'note'}
          variant="standard"
          onChange={handleNoteChange}
        />
      </Grid>
    </React.Fragment>
  )
}

export default ContactEdit
