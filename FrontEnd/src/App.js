import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Create/>}></Route>
        <Route path='/all' element={<Read/>}></Route>
        <Route path='/:id' element={<Update/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
