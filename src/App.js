import './App.css';
import Navbar from './components/navbar';

import {
    Switch, Route
} from 'react-router-dom';
import home from './pages/home';
import login from './pages/login';
import register from './pages/register';
import { ProtectedRoute } from './components/protected.route';
import reportgeneration from './pages/report-gen';

function App() {
  return (

          <Switch>
              <Route exact path="/login" component={login} />
              <Route exact path="/register" component={register} />
              <div>
                  <Navbar />
                  <Route exact path="/" component={home} />
                  <ProtectedRoute exact path='/upload' component={reportgeneration} />
              </div>
          </Switch>
  );
}

export default App;
