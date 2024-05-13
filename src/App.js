
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Navbar from './components/Navbar';

import About from './components/About';
import NoteState from './context/notes/noteState';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() {

  const[alert,setalert] =useState(null);
  const [vis,setvis]=useState({
    visibility:'hidden'
  });
  const showAlert=(massage,type)=>
  {
    setalert({
      msg:massage,
      type:type
    });
    setvis({
      visibility:'visible'
    });
    setTimeout(()=>
    {
      setvis({
        visibility:'hidden'
      });
      setalert(null);
    },1500);
  }
  return (
    <>
   <NoteState> 
    <Router>
        <Navbar /> 
        <Alert alert={alert} />
        <div className="container">
        <Switch>
      
         <Route  exact path="/">
         <Home key="auth1" showAlert={showAlert}/>
         </Route>
         <Route  exact path="/about">
         <About key="auth"/>
         </Route>
         <Route  exact path="/login">
         <Login key="auth2" showAlert={showAlert}/>
         </Route>
         <Route  exact path="/signup">
         <Signup key="auth3" showAlert={showAlert}/>
         </Route>
      
         
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
