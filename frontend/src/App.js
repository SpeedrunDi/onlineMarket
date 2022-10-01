import {Route, Switch} from "react-router-dom";
import {Typography} from "@mui/material";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="*" render={() => <Typography textAlign="center">Not found</Typography>}/>
    </Switch>
  </Layout>
);

export default App;
