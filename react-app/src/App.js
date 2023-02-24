import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Goals from "./components/Pages/Goals";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SingleGoal from "./components/Pages/SingleGoal";


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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/allgoals" >
            <Goals />
          </ProtectedRoute>
          <ProtectedRoute path="/goals/:id" >
            <SingleGoal />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
