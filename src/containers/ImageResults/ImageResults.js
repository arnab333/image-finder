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
import { ZoomIn, CloudDownload as CloudDownloadIcon } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff'
    }
  }
});

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const ImageResults = ({ images, loading, perPage }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const handleOpen = (image) => {
    setDialogOpen(true);
    setCurrentImage(image);
  };

  const handleDownload = () => {
    toDataURL(currentImage).then((dataUrl) => {
      const link = document.createElement('a');
      link.style = 'display: none';
      link.download = 'image.jpg';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div>
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
                        className="zoomIcon"
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
        <DialogActions className="dialogActions">
          <div className="row align-items-center">
            <div className="col-md-6">
              <IconButton
                // color="primary"
                onClick={handleDownload}
                className="downloadIcon">
                <CloudDownloadIcon />
              </IconButton>
            </div>
            <div className="col-md-6 text-right">
              <Button
                className="dialogCloseIcon"
                onClick={(event) => setDialogOpen(false)}
                color="primary"
                autoFocus>
                Close
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageResults;
