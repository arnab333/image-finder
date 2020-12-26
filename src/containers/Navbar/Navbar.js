import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
      // marginLeft: theme.spacing(1)
    }
  };
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Image Finder
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
