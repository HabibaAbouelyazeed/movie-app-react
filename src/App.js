import NavBar from './components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// pages
import Home from './pages/Home';
import Details from './pages/Details';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Celebs from './pages/Celebs';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <header >
        <NavBar/>
      </header>
    </div>

    <Routes>
      <Route path='' Component={Home}/>
      <Route path='/details/:media_type/:id' Component={Details}/>
      <Route path='/movies' Component={Movies}/>
      <Route path='/tv-shows' Component={TvShows}/>
      <Route path='/celebs' Component={Celebs}/>
    </Routes>
    </Router>
  );
}

export default App;
// className="App-header"