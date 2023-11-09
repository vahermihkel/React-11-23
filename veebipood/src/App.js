// import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Avaleht from './pages/Avaleht';
import Ostukorv from './pages/Ostukorv';
import LisaToode from './pages/LisaToode';
import NotFound from './pages/NotFound';
import Tooted from './pages/Tooted';
import YksToode from './pages/YksToode';
import MuudaToode from './pages/MuudaToode';

// import Avaleht from <-- default
// import { Ostkorv, Ostukorv2 } from

// const el = document.getElementById("");
// el.className = 

function App() {
  return (
    <div className="App">
      <Link to="/avaleht">
        <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
      </Link>

      <Link to="/ostukorv">
        <button className="nupp">Ostukorvi</button>
      </Link>

      <Link to="/lisa-toode">
        <button className="nupp">Toodet lisama</button>
      </Link>

      <Link to="/tooted">
        <button className="nupp">Tooted</button>
      </Link>

      <Routes>
        <Route path='avaleht' element={ <Avaleht /> } />
        <Route path='ostukorv' element={ <Ostukorv /> } />
        <Route path='lisa-toode' element={ <LisaToode /> } />
        <Route path='tooted' element={ <Tooted /> } />
        <Route path='toode' element={ <YksToode /> } />
        <Route path='muuda' element={ <MuudaToode /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    
    </div>
  );
}

export default App;
