import React from 'react';
import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-grid.min.css';

const App = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row">
        <Navbar />
      </div>
      <div className="row h-100">
        <Home />
      </div>
    </div>
  );
};

export default App;
