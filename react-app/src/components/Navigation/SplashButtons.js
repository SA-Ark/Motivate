import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import DemoUserButton from "../Buttons/DemoUserButton";
import { useSelector } from "react-redux";

function SplashButtons() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


if (!sessionUser){


  return (
    <>
   <div className="background-image">


    <div className="mid-splash-container">
    <div className="splash-quote">

          <p>The journey of a thousand miles begins with a single step...</p>
          <p>Are you brave enough to take that step?</p>
          <p> Turn your dreams into reality with this to-do-list.</p>
    </div>
          <div className="login">
            <OpenModalButton
              buttonText="Log In"
              // onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <DemoUserButton/>
           </div>
           </div>
          </div>
           <div className="signup">
            <OpenModalButton
              buttonText="Sign Up"
              // onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
          </>
  );
}else{
  return (null)
}
}

export default SplashButtons;
