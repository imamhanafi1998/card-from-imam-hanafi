import CardPage from "./components/CardPage";
// import HomePage from "./components/HomePage";
import CreateCardPage from "./components/CreateCardPage";
import CardPageForAulia from "./components/CardPageForAulia";
import CardPageForRina from "./components/CardPageForRina";
// import CardPageForRina2 from "./components/CardPageForRina2";
import UnknownPage from "./components/UnknownPage";

import { Router, Route, Switch } from "react-router-dom";
import History from "./components/History";

const AppRoutes = [
  // {
  //   path: "/",
  //   name: "Home Page",
  //   Component: HomePage,
  //   exact: true
  // },
  {
    path: "/",
    name: "Create Card Page",
    Component: CreateCardPage,
    exact: true
  },
  {
    path: "/card-id/:someone",
    name: "Card Page",
    Component: CardPage,
    exact: true
  },
  // {
  //   path: "/for-aulia",
  //   name: "Card Page For Aulia",
  //   Component: CardPageForAulia,
  //   exact: true
  // },
  {
    path: "/for-rina",
    name: "Card Page For Rina",
    Component: CardPageForRina,
    exact: true
  },
  // {
  //   path: "/for-rina-2",
  //   name: "Card Page For Rina",
  //   Component: CardPageForRina2,
  //   exact: true
  // },
  {
    path: "/",
    name: "Unknown Page",
    Component: UnknownPage,
    exact: false
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
