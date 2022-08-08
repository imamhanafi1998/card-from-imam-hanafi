import CardPage from "./components/CardPage";
import HomePage from "./components/HomePage";
import CreateCardPage from "./components/CreateCardPage";
import CardPageForAulia from "./components/CardPageForAulia";

import { Router, Route, Switch } from "react-router-dom";
import History from "./components/History";

const AppRoutes = [
  {
    path: "/",
    name: "Home Page",
    Component: HomePage,
    exact: true
  },
  {
    path: "/create",
    name: "Create Card Page",
    Component: CreateCardPage,
    exact: true
  },
  {
    path: "/for/:someone",
    name: "Card Page",
    Component: CardPage,
    exact: true
  },
  {
    path: "/for-aulia",
    name: "Card Page For Aulia",
    Component: CardPageForAulia,
    exact: true
  }
];

export default function App() {
  return (
    <Router history={History}>
      <Switch>
        {AppRoutes.map(({ path, Component, exact }, i) => (
          <Route key={i} exact={exact} path={path}>
            {({ match }) => <Component path={path} match={match} />}
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
