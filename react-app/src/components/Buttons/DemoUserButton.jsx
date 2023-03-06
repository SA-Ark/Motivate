import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
const DemoUserButton = () =>{
    const dispatch = useDispatch();
    const [email, password] = ["demouser@aa.io", "123"]

    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      } else {
        history.push("/allgoals")

      }
    };
    return (
        <>
            <button onClick={handleSubmit} type="button">Demo User</button>
        </>
    )
}

export default DemoUserButton;
