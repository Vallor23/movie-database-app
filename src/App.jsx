import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Search from './pages/Search';
import Favourites from './pages/Favourites';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import MovieDetails from './components/MovieDetails';


function App() {

  return (
    <div>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favourites' element={<Favourites />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/tv' element={<TVShows />} />
              <Route path='/search' element={<Search />} />
              <Route path='/movie/:id' element={<MovieDetails />} />
              <Route path="/tv/:id" element={ <MovieDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div> 
  )
}

export default App;