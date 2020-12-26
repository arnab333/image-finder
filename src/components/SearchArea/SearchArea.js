import React from 'react';
import { Paper, IconButton, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import './searchArea.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
    // width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const SearchArea = ({ setSearchText, searchText, handleSearchIconClick }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="row h-75">
        <div className={`col-12 imageDiv`}>
          <div className={`blankDiv`}></div>
          <div className="row h-100">
            <div className="col-md-12 topText my-auto">
              <div className="row">
                <div className="col-md-12">
                  <h1>Stunning free images &amp; royalty free stock</h1>
                </div>
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                  <Paper component="div" className={classes.root}>
                    <InputBase
                      value={searchText}
                      onChange={handleChange}
                      className={`${classes.input} inputBase`}
                      placeholder="Search Images"
                      inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton
                      onClick={handleSearchIconClick}
                      type="button"
                      className={`${classes.iconButton} iconButton`}
                      aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchArea;
