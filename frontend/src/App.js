import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {Typography} from "@mui/material";

const App = () => (
  <Switch>
    <Route path="/register" component={Register}/>
    <Route path="/login" component={Login}/>
    <Route path="*" render={() => <Typography textAlign="center">Not found</Typography>}/>
  </Switch>
);

export default App;
