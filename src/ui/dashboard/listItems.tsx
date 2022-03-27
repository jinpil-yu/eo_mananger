import * as React from 'react';
import {FC} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FeedIcon from '@mui/icons-material/Feed';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Menu} from "./DashboardController";

interface MenuItemsProps {
  onClick: (menu: Menu) => void
}
export const MenuItems: FC<MenuItemsProps> = ({onClick}) => (
  <React.Fragment>
    <ListItemButton onClick={() => onClick(Menu.member)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Members" />
    </ListItemButton>
    <ListItemButton onClick={() => onClick(Menu.notice)}>
      <ListItemIcon>
        <FeedIcon />
      </ListItemIcon>
      <ListItemText primary="Notice" />
    </ListItemButton>
    <ListItemButton onClick={() => onClick(Menu.schedule)}>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Schedule" />
    </ListItemButton>
    <ListItemButton onClick={() => onClick(Menu.contact)}>
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Contact" />
    </ListItemButton>
  </React.Fragment>)
