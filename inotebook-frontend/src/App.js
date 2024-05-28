
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <NoteState>
      <BrowserRouter>
      <Navbar/>
      <div className='container'>
      <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/signup' element={<SignUp/>}></Route>
      </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
