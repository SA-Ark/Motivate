import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Goals from "./components/Pages/Goals";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SingleGoal from "./components/Pages/SingleGoal";
import SplashPage from "./components/Pages/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact={true}>
          <SplashPage />
          </Route>
          <ProtectedRoute path="/allgoals" exact={true} >
            <Goals />
          </ProtectedRoute>
          <ProtectedRoute path="/goals/:id" exact={true} >
            <SingleGoal />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
