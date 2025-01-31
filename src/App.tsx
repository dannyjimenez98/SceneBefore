import Navbar from './components/Navbar';
import MovieDetailPage from './pages/MovieDetailPage';
import PopularPage from './pages/PopularPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
    <Router>
    <Navbar />
    <div className='container mx-auto max-w-screen-lg px-5 z-[0]'>
      <Routes>
        <Route path='/' element={<PopularPage />} />
        <Route path='/movie/:id' element={<MovieDetailPage />} />
      </Routes>
    </div>
    </Router>
    </>
  )
}

export default App
