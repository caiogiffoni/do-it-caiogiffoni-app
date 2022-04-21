import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <Signup />
      </Route>
    </Switch>
  );
}

export default Routes;
