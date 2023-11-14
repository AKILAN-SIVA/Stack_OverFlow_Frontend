import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Routes from './AllRoutes';
import { fetchAllQuestions } from './actions/question';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from './actions/users';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
