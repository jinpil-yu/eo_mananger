import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {FC} from "react";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import ErrorPaper from "./ErrorPaper";
import LoadingPaper from "./LoadingPaper";
import EmptyPaper from "./EmptyPaper";
import MemberController from "../member/MemberController";
import NoticeController from "../notice/NoticeController";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {getAuth} from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {MenuItems} from "./listItems";
import {Menu} from "./DashboardController";
import MemberList from "../../data/model/MemberList";
import NoticeList from "../../data/model/NoticeList";
import Data from "../../data/model/Data";
import ScheduleController from "../schedule/ScheduleController";
import ScheduleList from "../../data/model/ScheduleList";
import ContactList from "../../data/model/ContactList";
import ContactController from "../contact/ContactController";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

interface DashboardScreenProps {
  open: boolean
  loading: boolean
  model: Data | undefined | null
  onSelectMenu: (menu:Menu) => void
  onToggleDrawer: () => void
}

const DashboardScreen: FC<DashboardScreenProps> = ({open,loading, model, onSelectMenu, onToggleDrawer}) => {
  const navigate = useNavigate();

  const toggleDrawer = () => {
    onToggleDrawer();
  };

  function getContents(onClickRow: ({to, param}:{to: string, param: { state: any }}) => void) {
    if (loading) {
      return <LoadingPaper />
    }

    if (!model) {
      return <ErrorPaper /> // TODO: EMPTY
    }

    if (model.list.length === 0) {
      return <EmptyPaper />
    }

    return contentsProviderPerType()
  }

  function contentsProviderPerType() {
    if (model instanceof MemberList) {
      return <MemberController data={model.list} fetch={onSelectMenu} />
    } else if (model instanceof NoticeList) {
      return <NoticeController data={model.list} fetchMenu={onSelectMenu} />
    } else if (model instanceof ScheduleList) {
      return <ScheduleController data={model.list} fetch={onSelectMenu}/>
    } else if (model instanceof ContactList) {
      return <ContactController data={model.list} fetch={onSelectMenu}/>
    }
  }

  function onClickRow({to, param}:{to: string, param: { state: any }}) {
    navigate(to, param)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              DashBoard
            </Typography>
            <IconButton color="inherit" onClick={() => {
              const auth = getAuth();
              auth.signOut()
                .then(() => {
                  navigate(`/signIn`)
                }).catch((error) => {
                alert(JSON.stringify(error, null, 2))
                navigate(`/signIn`)
              })
            }}>
              <LogoutIcon />
              <Typography
                variant="button"
                display={"block"}
                color="inherit"
                sx={{ flexGrow: 1, ml: 1 }}
              >
                Sign Out
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MenuItems onClick={onSelectMenu} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {getContents(onClickRow)}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardScreen
