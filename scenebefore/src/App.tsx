import Navbar from './components/Navbar';
import MovieDetailPage from './pages/MovieDetailPage';
import PopularPage from './pages/PopularPage'
import NowPlayingPage from './pages/NowPlayingPage';
import UpcomingPage from './pages/UpcomingPage';
import TopRatedPage from './pages/TopRatedPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfilePage from './pages/UserProfilePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';


function App() {
  return (
    <>
    <Router>
    <Navbar />
    <div className='container mx-auto max-w-screen-lg px-5 z-[0]'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user' element={<UserProfilePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/popular' element={<PopularPage />} />
        <Route path='/upcoming' element={<UpcomingPage />} />
        <Route path='/now_playing' element={<NowPlayingPage />} />
        <Route path='/top_rated' element={<TopRatedPage/>} />
        <Route path='/movie/:id' element={<MovieDetailPage />} />
      </Routes>
    </div>
    </Router>
    </>
  )
}

export default App
