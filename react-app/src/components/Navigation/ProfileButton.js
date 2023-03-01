import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  return (
    <>
      <div className="top">
        {user && (
          <div className="logout">

          <>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
