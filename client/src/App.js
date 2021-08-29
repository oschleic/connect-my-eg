import './App.css';
import Login from "./Login";
import Signup from './Signup';
import Home from './Home'
import Loading from './Views/Loading';
import {BrowserRouter, Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      localStorage.getItem("token") !== null
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

function App() {
  return (
    <>
      <BrowserRouter>
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/connecting" component={Loading}></Route>
      </BrowserRouter>
    </>
  );
}

export default App;
