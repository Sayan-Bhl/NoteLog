import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import Login from './Components/Login';
import Signup from './Components/Signup'
import NoteState from './Context/NoteState'
import Alert from "./Components/Alert";
import Account from "./Components/Account";
import { useState } from 'react';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (

    <div className="App">

      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Body showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/account" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </NoteState>

    </div>

  );
}

export default App;
