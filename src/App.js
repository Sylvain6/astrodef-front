import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Definitions from './component/Definitions/Definitions';
import DefBySubject from './component/Definitions/DefinitionsBySubject';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Subjects from './component/Subjects/Subjects';
import Home from './component/Home/Home';
import UnloggedHome from './component/Home/UnloggedHome';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [cookies, setCookie] = useCookies(['mln-astrodef']);
  return (
      <>
    {
      cookies['mln-astrodef'] === process.env.REACT_APP_TOKEN ?
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
      <img
        src="https://icons-for-free.com/iconfiles/png/512/color+cinema+icons+Astronaut-1320567850764192548.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="logo"
            />
            AstroDef</Navbar.Brand>
          <Nav className="mr-auto">
              <Nav.Link href="/subjects">Subjects</Nav.Link>
              <Nav.Link href="/definitions">Definitions</Nav.Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/list/:name">
            <DefBySubject />
          </Route>
          <Route path="/definitions">
            <Definitions />
          </Route>
          <Route path="/subjects">
            <Subjects />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router >: <UnloggedHome />}
    </>
  );
  }

  export default App;
