import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact></Route>
      <Route path="/chat" component={ChatPage}></Route>
    </div>
  );
}

export default App;
