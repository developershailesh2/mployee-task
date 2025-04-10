import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {BrowserRouter , Routes , Route} from "react-router-dom";
import "./App.css";

import { HomePage } from "./components/home-page";
import { Navbar } from "./components/navbar";

function App() {
 

  return (
    
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
