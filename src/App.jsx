// App.js
import React from 'react';
import './App.css'; // Ensure this file imports Tailwind's CSS
import Login from './components/Login';
import Body from './components/Body';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Profile from "./components/Profile"
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';

function App() {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename='/'>
      
      <Routes>
        
      <Route path="/" element={<Body/>}> 
    {/* those routes which we want that tehya re oprn inside the body but other compoenents remaisn same then we sued the outlet ans thne thse routes must be within the body routes*/}
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<Feed/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      </Route>
        </Routes>
        </BrowserRouter>
        </Provider>

     
     
    </div>
    

  );
}

export default App;
