// import logo from './logo.svg';

import { BrowserRouter } from "react-router-dom";

import Approuter from "./router/Approuter.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";


function App() {
  return (
    <div
    >
        <BrowserRouter>
          <Approuter />
        </BrowserRouter>
    </div>
  );
}

export default App;
