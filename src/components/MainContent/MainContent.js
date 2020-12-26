import React from 'react';
import ImageResults from '../../containers/ImageResults/ImageResults';
import './mainContent.css';

const MainContent = ({ images, loading, perPage, hasMore }) => {
  return (
    <React.Fragment>
      <div className="row mb-5" id="mainContentRow">
        <div className="col-md-12" id="mainContentColumn">
          <ImageResults images={images} loading={loading} perPage={perPage} />
        </div>
      </div>
      <div className="row mb-5 text-center">
        <div className="col-md-12">
          {!hasMore && (
            <h3>You have loaded all the images. Thanks for visitng!</h3>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainContent;
