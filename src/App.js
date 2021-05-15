import './App.css'
import { Chat } from './components/Chat';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import Login from './components/Login';
import { useStaeValue } from './StateProvider';

function App() {
  const [{user},dispatch] = useStaeValue();
  return (
    <div className="app">
    {
      !user ? (
        <Login/>
      ):(
        <div className="app__body">
          <Router>
            <Sidebar/>
            <Switch> 
              {/* <Route path="/" >
                <Chat/>
              </Route> */}
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
            </Switch>
          </Router>
        </div>
      )
    }
     
    </div>
  );
}

export default App;
