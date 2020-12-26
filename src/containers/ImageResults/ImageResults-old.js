import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  GridList,
  GridListTile,
  IconButton,
  Dialog,
  Button,
  GridListTileBar,
  DialogActions
} from '@material-ui/core';
import { ZoomIn } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff'
    }
  }
});

const ImageResults = ({ images, loading, perPage }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const handleOpen = (image) => {
    setDialogOpen(true);
    setCurrentImage(image);
  };

  return (
    <div>
      {/* <GridList cols={3}>
        {loading
          ? Array(18)
              .fill()
              .map((item, index) => {
                return (
                  <Box key={index} marginTop={`4px`}>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      // width={`33.3333%`}
                      height={`184px`}
                    />
                  </Box>
                );
              })
          : images.map((item, index) => {
              return (
                <GridListTile key={item.id}>
                  <img src={item.largeImageURL} alt={item.tags} />
                  <GridListTileBar
                    title={item.tags}
                    subtitle={
                      <span>
                        by: <strong>{item.user}</strong>
                      </span>
                    }
                    actionIcon={
                      <IconButton
                        onClick={() => handleOpen(item.largeImageURL)}>
                        <ThemeProvider theme={theme}>
                          <ZoomIn color="primary" />
                        </ThemeProvider>
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            })}
      </GridList> */}
      <GridList cols={3}>
        {loading
          ? Array(perPage)
              .fill()
              .map((item, index) => {
                return (
                  <GridListTile key={index}>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      // width={`33.3333%`}
                      height={`184px`}
                    />
                    <GridListTileBar
                      title={
                        <Skeleton animation="wave" height={10} width="50%" />
                      }
                      subtitle={
                        <Skeleton animation="wave" height={10} width="25%" />
                      }
                      actionIcon={
                        <IconButton disabled={true}>
                          <ThemeProvider theme={theme}>
                            <ZoomIn color="primary" />
                          </ThemeProvider>
                        </IconButton>
                      }
                    />
                  </GridListTile>
                );
              })
          : images.map((item, index) => {
              return (
                <GridListTile key={index}>
                  <img src={item.largeImageURL} alt={item.tags} />
                  <GridListTileBar
                    title={item.tags}
                    subtitle={
                      <span>
                        by: <strong>{item.user}</strong>
                      </span>
                    }
                    actionIcon={
                      <IconButton
                        onClick={() => handleOpen(item.largeImageURL)}>
                        <ThemeProvider theme={theme}>
                          <ZoomIn color="primary" />
                        </ThemeProvider>
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            })}
      </GridList>
      <Dialog open={dialogOpen} onClose={(event) => setDialogOpen(false)}>
        <img src={currentImage} alt="" style={{ width: '100%' }} />
        <DialogActions>
          <Button
            onClick={(event) => setDialogOpen(false)}
            color="primary"
            autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageResults;
