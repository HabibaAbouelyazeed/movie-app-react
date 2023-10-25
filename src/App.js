import NavBar from './components/NavBar';
import Home from './pages/Home';
import Details from './pages/Details';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
    </Routes>
    </Router>
  );
}

export default App;
// className="App-header"