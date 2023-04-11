import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Goals from "./components/Pages/Goals";
import Badges from "./components/Pages/Badges";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SingleGoal from "./components/Pages/SingleGoal";
import SingleBadge from "./components/Pages/SingleBadge";
import SplashPage from "./components/Pages/SplashPage";
import ParentGoals from "./components/Pages/ParentGoals";
import SingleTask from "./components/Pages/SingleTask";
import Tasks from "./components/Pages/Tasks";
import FinishedTasks from "./components/Pages/FinishedTasks";

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
          <ProtectedRoute path="/goals/:goalId/parentgoals" exact={true} >
            <ParentGoals />
          </ProtectedRoute>
          <ProtectedRoute path="/badges" exact={true} >
            <Badges />
          </ProtectedRoute>
          <ProtectedRoute path="/goals/:id" exact={true} >
            <SingleGoal />
          </ProtectedRoute>
          <ProtectedRoute path="/badges/:id" exact={true} >
            <SingleBadge />
          </ProtectedRoute>
          <ProtectedRoute path="/tasks/:id" exact={true} >
            <SingleTask />
          </ProtectedRoute>
          <ProtectedRoute path="/goals/tasks/:goalId" exact={true} >
            <Tasks />
          </ProtectedRoute>
          <ProtectedRoute path="/goals/finishedtasks/:goalId" exact={true} >
            <FinishedTasks />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
