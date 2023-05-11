import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ArticleLists from "./pages/ArticleLists";
import ArticlePurchase from "./components/ArticlePurchase";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"}>
          <Redirect to="/articles" />
        </Route>
        <Route exact path={"/articles"} component={ArticleLists} />
        <Route exact path={"/article/purchase"} component={ArticlePurchase} />
      </Switch>
    </Router>
  );
}

export default App;
