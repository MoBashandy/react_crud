import {BrowserRouter,Routes,Route,Link,NavLink} from 'react-router-dom';
import './App.css';
import CreateUser from './components/CreateUser';
import Header from './components/Header';
import Listuser from './components/Listuser';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/user/create" element= {<CreateUser/>} />
          <Route path="/users/list" element= {<Listuser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
