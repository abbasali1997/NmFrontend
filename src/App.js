import './App.css';
import Navbar from './components/navbar';

import {
    Switch, Route
} from 'react-router-dom';
import home from './pages/home';
import login from './pages/login';
import register from './pages/register';
import uploaddata from './pages/upload-data';

function App() {
  return (

          <Switch>
              <Route exact path="/login" component={login} />
              <Route exact path="/register" component={register} />
              <div>
                  <Navbar />
                  <Route exact path="/" component={home} />
                  <Route exact path="/upload" component={uploaddata} />
              </div>
          </Switch>
  );
}

export default App;
