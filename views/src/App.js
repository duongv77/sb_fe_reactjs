import './App.css';
import Routers from './Router';
import { useState } from 'react';
import Loading from './components/Loading';
import { ToastContainer } from "react-toastify";
import firebase from "./firebase"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        {/* <Loading loading={loading}/> */}
        <Routers setLoading={setLoading}/>
    </div>
  );
}

export default App;
