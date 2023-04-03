import './App.css';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import DataProvider from './redux/store';



function App() {

  return (
    <div className="App">
      <DataProvider>
        <ToastContainer />
        <Routes />
      </DataProvider>
    </div>
  );
}

export default App;
