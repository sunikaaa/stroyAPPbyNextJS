import React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '../drawer';
import {Menu} from '@material-ui/icons'
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginRight: "20px"
    },
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles()
  const router = useRouter()
  const toLoginPage = (e) => {
    e.preventDefault()
    router.push("/login")
  }
  return (
      <AppBar position="static" color="transparent">

        <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu></Menu>
          </IconButton> */}
          <div className="mr-2">

          <Drawer />
          </div>
          <Typography variant="h6" className={classes.title}>
            TRPG tools
          </Typography>
          <Button color="inherit" onClick={toLoginPage}>Login</Button>
        </Toolbar>
      </AppBar>
  );
}