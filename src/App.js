import React from 'react';
import AppRouter from './Route/Routes';
import { render } from "react-dom";
import { useState, useEffect, useContext } from 'react';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/font-awesome/css/all.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
function App() {
  return (
      <>
          <div className="App">
                  <AppRouter />
          </div>
      </>
  );
}

export default App;
