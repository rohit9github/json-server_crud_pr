import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import View from './Components/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/view' element={<View/>}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
